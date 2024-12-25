import { create } from 'zustand';

import getConfiguration from '../../getConfiguration';

import { TEditorConfiguration } from './core';

type TValue = {
  document: TEditorConfiguration;

  selectedBlockId: string | null;
  selectedLeftSidebarTab: 'templates' | 'components';
  selectedSidebarTab: 'block-configuration' | 'styles';
  selectedMainTab: 'editor' | 'preview' | 'json' | 'html';
  selectedScreenSize: 'desktop' | 'mobile';

  inspectorDrawerOpen: boolean;
  samplesDrawerOpen: boolean;
};

const editorStateStore = create<TValue>(() => ({
  document: getConfiguration(window.location.hash),
  selectedBlockId: null,
  selectedLeftSidebarTab: 'templates',
  selectedSidebarTab: 'styles',
  selectedMainTab: 'editor',
  selectedScreenSize: 'desktop',

  inspectorDrawerOpen: true,
  samplesDrawerOpen: true,
}));

export function useDocument() {
  return editorStateStore((s) => s.document);
}

export function useSelectedBlockId() {
  return editorStateStore((s) => s.selectedBlockId);
}

export function useSelectedScreenSize() {
  return editorStateStore((s) => s.selectedScreenSize);
}

export function useSelectedMainTab() {
  return editorStateStore((s) => s.selectedMainTab);
}

export function setSelectedMainTab(selectedMainTab: TValue['selectedMainTab']) {
  return editorStateStore.setState({ selectedMainTab });
}

export function useSelectedSidebarTab() {
  return editorStateStore((s) => s.selectedSidebarTab);
}
export function useSelectedLeftSidebarTab() {
  return editorStateStore((s) => s.selectedLeftSidebarTab);
}

export function useInspectorDrawerOpen() {
  return editorStateStore((s) => s.inspectorDrawerOpen);
}

export function useSamplesDrawerOpen() {
  return editorStateStore((s) => s.samplesDrawerOpen);
}

export function setSelectedBlockId(selectedBlockId: TValue['selectedBlockId']) {
  const selectedSidebarTab = selectedBlockId === null ? 'styles' : 'block-configuration';
  const options: Partial<TValue> = {};
  if (selectedBlockId !== null) {
    options.inspectorDrawerOpen = true;
  }
  return editorStateStore.setState({
    selectedBlockId,
    selectedSidebarTab,
    ...options,
  });
}

export function setSidebarTab(selectedSidebarTab: TValue['selectedSidebarTab']) {
  return editorStateStore.setState({ selectedSidebarTab });
}
export function setLeftSidebarTab(selectedLeftSidebarTab: TValue['selectedLeftSidebarTab']) {
  return editorStateStore.setState({ selectedLeftSidebarTab });
}

export function resetDocument(document: TValue['document']) {
  return editorStateStore.setState({
    document,
    selectedSidebarTab: 'styles',
    selectedBlockId: null,
  });
}
function updateTemplateKeys(template:any) {
  // Define keyMap with a more explicit type
  const keyMap: Record<string, string> = {};

  // Function to generate a new unique key
  function generateNewKey(oldKey:string) {
    if (!keyMap[oldKey]) {
      keyMap[oldKey] = `block-${Date.now()}${Math.floor(Math.random() * 1000)}`;
    }
    return keyMap[oldKey];
  }

  // Step 1: Update all block keys except the root
  const updatedTemplate = Object.entries(template).reduce((newTemplate:any, [key, block]:any) => {
    // Preserve the root key
    const newKey = key === "root" ? key : generateNewKey(key);
    newTemplate[newKey] = { ...block };
    return newTemplate;
  }, {});

  // Helper function to update childrenIds recursively
  function updateChildrenIds(childrenIds: string[]) {
    return childrenIds.map((childId: string) => keyMap[childId] || childId);
  }

  // Step 2: Update all `childrenIds` and other references within the blocks
  Object.entries(updatedTemplate).forEach(([key, block]:any) => {
    if (block.data) {
      // Update direct `childrenIds`
      if (block.data.childrenIds) {
        block.data.childrenIds = updateChildrenIds(block.data.childrenIds);
      }

      // Special case for `ColumnsContainer`
      if (block.type === "ColumnsContainer" && block.data.props?.columns) {
        block.data.props.columns.forEach((column:any) => {
          if (column.childrenIds) {
            column.childrenIds = updateChildrenIds(column.childrenIds);
          }
        });
      }

      // Update other nested structures that might contain `childrenIds`
      if (block.data.props?.childrenIds) {
        block.data.props.childrenIds = updateChildrenIds(block.data.props.childrenIds);
      }
    }
  });

  return updatedTemplate;
}
export function setDocument(document: TValue['document']) {
  const originalDocument = editorStateStore.getState().document;

  const newDoc = JSON.parse(JSON.stringify(document))
  for (const key in document) {
    if (Object.prototype.hasOwnProperty.call(document, key)) {
      const element:any = document[key];
      if (element.type == "CustomBlock") {
        const rootdata = updateTemplateKeys(JSON.parse(JSON.stringify(element.data)))
        newDoc[key] = rootdata.root
        delete rootdata.root
        return editorStateStore.setState({
          document: {
            ...originalDocument,
            ...rootdata,
            ...newDoc,
          },
        });
      }
    }
  }
  return editorStateStore.setState({
    document: {
      ...originalDocument,
      ...document,
    },
  });
}

export function toggleInspectorDrawerOpen() {
  const inspectorDrawerOpen = !editorStateStore.getState().inspectorDrawerOpen;
  return editorStateStore.setState({ inspectorDrawerOpen });
}

export function toggleSamplesDrawerOpen() {
  const samplesDrawerOpen = !editorStateStore.getState().samplesDrawerOpen;
  return editorStateStore.setState({ samplesDrawerOpen });
}

export function setSelectedScreenSize(selectedScreenSize: TValue['selectedScreenSize']) {
  return editorStateStore.setState({ selectedScreenSize });
}
