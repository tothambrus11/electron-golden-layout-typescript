export type ItemType = "row" | "column" | "stack" | "component" | "react-component" | "root";


export interface ItemConfig {
    /**
     * The type of the item. Possible values are 'row', 'column', 'stack', 'component' and 'react-component'
     */
    type: ItemType

    /**
     * An array of configurations for items that will be created as children of this item
     */
    content?: ItemConfig[]
    /**
     * The width of this item, relative to the other children of its parent in percent
     */
    width?: number
    /**
     * The height of this item, relative to the other children of its parent in percent
     */
    height?: number

    /**
     * A String or an Array of Strings. Used to retrieve the item using item.getItemsById()
     */
    id?: string | string[]

    /**
     * Determines if the item is closable. If false, the x on the items tab will be hidden and container.close() will return false
     */
    isClosable?: boolean

    /**
     * The title of the item as displayed on its tab and on popout windows
     */
    title?: string

    /**
     * [Stack specific]  The index of the initially selected tab
     */
    activeItemIndex?: number

    /**
     * The name of the component as specified in layout.registerComponent. Mandatory if type is 'component'
     */
    componentName?: string

    /**
     * A serialisable object. Will be passed to the component constructor function and will be the value returned by container.getState().
     */
    componentState?: any
}

export interface LayoutConfig {
    settings?: {
        /**
         * Turns headers on or off. If false, the layout will be displayed with splitters only.
         */
        hasHeaders?: boolean,
        /**
         * Constrains the area in which items can be dragged to the layout's container. Will be set to false automatically when layout.createDragSource() is called.
         */
        constrainDragToContainer?: boolean,
        /**
         * If true, the user can re-arrange the layout by dragging items by their tabs to the desired location.
         */
        reorderEnabled?: boolean,
        /**
         * If true, the user can select items by clicking on their header. This sets the value of layout.selectedItem to the clicked item, highlights its header and the layout emits a 'selectionChanged' event.
         */
        selectionEnabled?: boolean,
        /**
         * Decides what will be opened in a new window if the user clicks the popout icon. If true the entire stack will be transferred to the new window, if false only the active component will be opened.
         */
        popoutWholeStack?: boolean,
        /**
         * Specifies if an error is thrown when a popout is blocked by the browser (e.g. by opening it programmatically). If false, the popout call will fail silently.
         */
        blockedPopoutsThrowError?: boolean,
        /**
         * Specifies if all popouts should be closed when the page that created them is closed. Popouts don't have a strong dependency on their parent and can exist on their own, but can be quite annoying to close by hand. In addition, any changes made to popouts won't be stored after the parent is closed.
         */
        closePopoutsOnUnload?: boolean,
        /**
         * Specifies if the popout icon should be displayed in the header-bar.
         */
        showPopoutIcon?: boolean,
        /**
         * Specifies if the maximise icon should be displayed in the header-bar.
         */
        showMaximiseIcon?: boolean,
        /**
         * Specifies if the close icon should be displayed in the header-bar.
         */
        showCloseIcon?: boolean
    },
    dimensions?: {
        /**
         * The width of the borders between the layout items in pixel. Please note: The actual draggable area is wider than the visible one, making it safe to set this to small values without affecting usability.
         */
        borderWidth?: number,
        /**
         * The minimum height an item can be resized to (in pixel).
         */
        minItemHeight?: number,
        /**
         * The minimum width an item can be resized to (in pixel).
         */
        minItemWidth?: number,
        /**
         * The height of the header elements in pixel. This can be changed, but your theme's header css needs to be adjusted accordingly.
         */
        headerHeight?: number,
        /**
         The width of the element that appears when an item is dragged (in pixel).
         */
        dragProxyWidth?: number,
        /**
         * The height of the element that appears when an item is dragged (in pixel).
         */
        dragProxyHeight?: number
    },
    labels?: {
        /**
         * The tooltip text that appears when hovering over the close icon.
         */
        close?: string,
        /**
         * The tooltip text that appears when hovering over the maximise icon.
         */
        maximise?: string,
        /**
         * The tooltip text that appears when hovering over the minimise icon.
         */
        minimise?: string,
        /**
         * The tooltip text that appears when hovering over the popout icon.
         */
        popout?: string,
    },
    content: ItemConfig[]
}

interface GoldenBrowserWindow {
    /**
     * True if the window has been opened and its GoldenLayout instance initialised.
     */
    isInitialised: boolean

    on: (eventName: GoldenBrowserWindowEvent, callback: (layoutItem: Item) => void) => void
    emit: (eventName: GoldenBrowserWindowEvent, ...args: any) => void
    trigger: (eventName: GoldenBrowserWindowEvent, ...args: any) => void

    /**
     * Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    unbind: (eventName: GoldenBrowserWindowEvent, callback?: () => void, context?: any) => void

    /**
     * Alias for unbind. Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    off: (eventName: GoldenBrowserWindowEvent, callback?: () => void, context?: any) => void


    toConfig: ()=>{
        dimensions: {
            width: number,
            height: number,
            left: number,
            top: number
        }
        content: ItemConfig[]
        parentId: string | string[]
        indexInParent: number
    }

    /**
     * Returns the GoldenLayout instance from the child window
     */
    getGlInstance: ()=> GoldenLayoutObject

    /**
     * Returns the native Window object
     */
    getWindow: ()=> Window

    /**
     * Closes the popout
     */
    close: ()=>void

    /**
     * Returns the popout to its original position as specified in parentId and indexInParent
     */
    popIn: ()=>void

}

export type GoldenBrowserWindowEvent = "isInitialised" | "closed";

export interface GoldenLayoutObject {
    /**
     * The topmost item in the layout item tree. In browser terms: Think of the GoldenLayout instance as window object and of goldenLayout.root as the document.
     */
    root: {
        contentItems: Item[]
    }

    /**
     * A reference to the (jQuery) DOM element containing the layout
     */
    container: JQuery

    /**
     * True once the layout item tree has been created and the initialised event has been fired.
     */
    isInitialised: boolean

    /**
     * A reference to the current, extended top level config. Don't rely on this object for state saving / serialisation. Use layout.toConfig() instead.
     */
    config: LayoutConfig;

    /**
     * The currently selected item or null if no item is selected. Only relevant if settings.selectionEnabled is set to true.
     */
    selectedItem: Item | null

    /**
     * The current outer width of the layout in pixels
     */
    width: number

    /**
     * The current outer height of the layout in pixels
     */
    height: number

    /**
     * An array of GoldenBrowserWindow instances
     */
    openPopouts: GoldenBrowserWindow;

    /**
     * True if the layout has been opened as a popout by another layout
     */
    isSubWindow: boolean;

    on: (eventName: GoldenLayoutEventName, callback: (layoutItem: Item) => void) => void
    emit: (eventName: GoldenLayoutEventName, ...args: any) => void
    trigger: (eventName: GoldenLayoutEventName, ...args: any) => void

    /**
     * Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    unbind: (eventName: GoldenLayoutEventName, callback?: () => void, context?: any) => void

    /**
     * Alias for unbind. Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    off: (eventName: GoldenLayoutEventName, callback?: () => void, context?: any) => void


    registerComponent: (componentName: string, componentFactory: (container: JQuery, state: any) => void) => void

    /**
     * Renders the layout into the container. If init() is called before the document is ready it attaches itself as a listener to the document and executes once it becomes ready.
     */
    init: () => void;

    /**
     * Returns the current state of the layout and its components as a serialisable object.
     */
    toConfig: () => any;

    /**
     * Returns a component that was previously registered with layout.registerComponent().
     * @param name
     */
    getComponent: (name: string) => any;

    /**
     * Resizes the layout. If no arguments are provided GoldenLayout measures its container and resizes accordingly.
     * @param width The outer width the layout should be resized to
     * @param height The outer height the layout should be resized to
     */
    updateSize: (width?: number, height?: number) => void

    /**
     * Destroys the layout. Recursively calls destroy on all components and content items, removes all event listeners and finally removes itself from the DOM.
     */
    destroy: () => void;

    /**
     * Creates a new content item or tree of content items from configuration. Usually you wouldn't call this directly, but instead use methods like layout.createDragSource(), item.addChild() or item.replaceChild() that all call this method implicitly.
     * @param itemConfiguration An item configuration (can be an entire tree of items)
     * @param parent A parent item
     */
    createContentItem: (itemConfiguration: ItemConfig, parent: Item) => void

    /**
     * Creates a new popout window with configOrContentItem as contents at the position specified in dimensions
     * @param configOrContentItem The content item or config that will be created in the new window. If a item is provided its config will be read, if config is provided, only the content key will be used
     * @param dimensions A map containing the keys left, top, width and height. Left and top can be negative to place the window in another screen.
     * @param parentId The id of the item within the current layout the child window's content will be appended to when popIn is clicked
     * @param indexInParent The index at which the child window's contents will be appended to
     */
    createPopout: (configOrContentItem: ItemConfig | Item, dimensions: { left: number, top: number, width: number, height: number }, parentId: string, indexInParent?: number) => void

    /**
     * Turns a DOM element into a dragSource, meaning that the user can drag the element directly onto the layout where it turns into a contentItem.
     * @param element The DOM element that will be turned into a dragSource
     * @param itemConfiguration An item configuration (can be an entire tree of items)
     */
    createDragSource: (element: HTMLElement | JQuery, itemConfiguration: ItemConfig) => void

    /**
     * If settings.selectionEnabled is set to true, this allows to select items programmatically.
     * @param item An Item instance
     */
    selectItem: (item: Item) => void


    /**
     * Static method on the GoldenLayout constructor! This method will iterate through a GoldenLayout config object and replace frequent keys and values with single letter substitutes.
     * @param config A GoldenLayout configuration object
     */
    minifyConfig: (config: LayoutConfig) => any

    /**
     * Static method on the GoldenLayout constructor! This method will reverse the minifications of GoldenLayout.minifyConfig.
     * @param minifiedGoldenLayoutConfig A minified GoldenLayout configuration object
     */
    unminifyConfig: (minifiedGoldenLayoutConfig: any) => LayoutConfig
}

type GoldenLayoutEventName =
    "initialised"
    | "stateChanged"
    | "windowOpened"
    | "windowClosed"
    | "selectionChanged"
    | "itemDestroyed"
    | "itemCreated"
    | "componentCreated"
    | "rowCreated"
    | "columnCreated"
    | "stackCreated"
    | "tabCreated";


export interface Item {
    /**
     * This items configuration in its current state
     */
    config?: ItemConfig

    /**
     * The type of the item. Can be row, column, stack, component or root
     */
    type: ItemType

    /**
     * An array of items that are children of this item
     */
    contentItems: Item[]

    /**
     * The item that is this item's parent (or null if the item is root)
     */
    parent: null | Item

    /**
     * A String or array of identifiers if provided in the configuration
     */
    id: string | string[]

    /**
     * True if the item had been initialised
     */
    isInitialised: boolean

    /**
     * True if the item is maximised
     */
    isMaximised: boolean

    /**
     * True if the item is the layout's root item
     */
    isRoot: boolean

    /**
     * True if the item is a row
     */
    isRow: boolean

    /**
     * True if the item is a column
     */
    isColumn: boolean

    /**
     * True if the item is a stack
     */
    isStack: boolean

    /**
     * True if the item is a component
     */
    isComponent: boolean

    /**
     * A reference to the layoutManager that controls this item
     */
    layoutManager: any // TODO layoutmanager

    /**
     * The item's outer element
     */
    element: JQuery

    /**
     * The item's inner element. Can be the same as the outer element.
     */
    childElementContainer: JQuery

    /**
     * Adds an item as a child to this item. If the item is already a part of a layout it will be removed from its original position before adding it to this item.
     * @param itemOrItemConfig A content item (or tree of content items) or an ItemConfiguration to create the item from
     * @param index An optional index that determines at which position the new item should be added.
     */
    addChild: (itemOrItemConfig: Item | ItemConfig, index?: number) => void

    /**
     * Destroys the item and all it's children.
     * @param contentItem The contentItem that should be removed
     * @param keepChild If true the item won't be destroyed. (Use cautiosly, if the item isn't destroyed it's up to you to destroy it later)
     */
    removeChild: (contentItem: Item, keepChild?: boolean) => void

    /**
     * Replaces oldChild with newChild
     * @param oldChild The contentItem that should be removed
     * @param newChild A content item (or tree of content items) or an ItemConfiguration to create the item from
     */
    replaceChild: (oldChild: Item, newChild: Item) => void

    /**
     * Updates the items size. To actually assign a new size from within a component, use container.setSize( width, height )
     */
    setSize: () => void

    /**
     * Sets the item's title to the provided value. Triggers titleChanged and stateChanged events
     * @param title the new title
     */
    setTitle: (title: string) => void

    /**
     * A powerful, yet admittedly confusing method to recursively call methods on items in a tree. Usually you wouldn't need to use it directly, but it's used internally to setSizes, destroy parts of the item tree etc.
     * @param functionName The name of the method to invoke
     * @param functionArguments An array of arguments to pass to every function
     * @param bottomUp If true, the method is invoked on the lowest parts of the tree first and then bubbles upwards
     * @param skipSelf If true, the method will only be invoked on the item's children, but not on the item itself
     */
    callDownwards: (functionName: string, functionArguments: any[], bottomUp: boolean, skipSelf: boolean) => void

    /**
     * Emits an event that bubbles up the item tree until it reaches the root element (and after a delay the layout manager). Useful e.g. for indicating state changes.
     * @param eventName the name of the event
     */
    emitBubblingEvent: (eventName: string) => void

    /**
     * Convenience method for item.parent.removeChild( item )
     */
    remove: () => void

    /**
     * Removes the item from its current position in the layout and opens it in a window
     */
    popout: () => void

    /**
     * Maximises the item or minimises it if it's already maximised
     */
    toggleMaximise: () => void

    /**
     * Selects the item. Only relevant if settings.selectionEnabled is set to true
     */
    select: () => void

    /**
     * Unselects the item. Only relevant if settings.selectionEnabled is set to true
     */
    decelect: () => void

    /**
     * Returns true if the item has the specified id or false if not
     * @param id An id to check for
     */
    hasId: (id: number) => boolean

    /**
     * Only Stacks have this method! It's the programmatical equivalent of clicking a tab.
     * @param contentItem The new active content item
     */
    setActiveContentItem: (contentItem: Item) => void

    /**
     * Only Stacks have this method! Returns the currently selected contentItem.
     */
    getActiveContentItem: () => Item

    /**
     * Adds an id to an item or does nothing if the id is already present
     * @param id The id to be added
     */
    addId: (id: string) => void

    /**
     * Removes an id from an item or throws an error if the id couldn't be found
     * @param id The id to be removed
     */
    removeId: (id: string) => void

    /**
     * Calls filterFunction recursively for every item in the tree. If the function returns true the item is added to the resulting array
     * @param filterFunction A function that determines whether an item matches certain criteria
     */
    getItemsByFilter: (filterFunction: (item: Item) => boolean) => Item[]

    /**
     * Returns all items with the specified id.
     * @param id An id specified in the itemConfig
     */
    getItemsById: (id: string) => Item[]

    /**
     * Returns all items with the specified type
     * @param type 'row', 'column', 'stack', 'component' or 'root'
     */
    getItemsByType: (type: ItemType) => Item[]

    /**
     * Returns all instances of the component with the specified componentName
     * @param componentName a componentName as specified in the itemConfig
     */
    getComponentsByName: (componentName: string) => Item[]


    on: (eventName: ItemEvent, callback: (layoutItem: Item) => void) => void
    emit: (eventName: ItemEvent, ...args: any) => void
    trigger: (eventName: ItemEvent, ...args: any) => void

    /**
     * Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    unbind: (eventName: ItemEvent, callback?: () => void, context?: any) => void

    /**
     * Alias for unbind. Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    off: (eventName: ItemEvent, callback?: () => void, context?: any) => void

}


export type ItemEvent =
    "stateChanged"
    | "titleChanged"
    | "activeContentItemChanged"
    | "itemDestroyed"
    | "itemCreated"
    | "componentCreated"
    | "rowCreated"
    | "columnCreated"
    | "stackCreated";


export interface Container {
    /**
     * The current width of the container in pixels
     */
    width: number

    /**
     * The current height of the container in pixels
     */
    height: number

    /**
     * A reference to the component-item that controls this container
     */
    parent: Item

    /**
     * A reference to the tab that controls this container. Will initially be null (and populated once a tab event has been fired).
     */
    tab: Tab | null

    /**
     * The current title of the container
     */
    title: string

    /**
     * A reference to the GoldenLayout instance this container belongs to
     */
    layoutManager: GoldenLayoutObject

    /**
     * True if the item is currently hidden
     */
    isHidden: boolean

    on: (eventName: ContainerEvents, callback: (layoutItem: Item) => void) => void
    emit: (eventName: ContainerEvents, ...args: any) => void
    trigger: (eventName: ContainerEvents, ...args: any) => void

    /**
     * Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    unbind: (eventName: ContainerEvents, callback?: () => void, context?: any) => void

    /**
     * Alias for unbind. Unsubscribes either all listeners if just an eventName is provided, just a specific callback if invoked with eventName and callback or just a specific callback with a specific context if invoked with all three arguments.
     * @param eventName The name of the event to unsubscribe from
     * @param callback The function that should be invoked when the event occurs
     * @param context The function that should be invoked when the event occurs
     */
    off: (eventName: ContainerEvents, callback?: () => void, context?: any) => void


    /**
     * Returns the container's inner element as a jQuery element
     */
    getElement: () => JQuery

    /**
     * Overwrites the components state with the provided value. To only change parts of the componentState see extendState below. This is the main mechanism for saving the state of a component. This state will be the value of componentState when layout.toConfig() is called and will be passed back to the component's constructor function. It will also be used when the component is opened in a new window.
     * @param state A serialisable object
     */
    setState: (state: any) => void

    /**
     * This is similar to setState, but merges the provided state into the current one, rather than overwriting it.
     * @param state A serialisable object
     */
    extendState: (state: any) => void

    /**
     * Returns the current state.
     */
    getState: () => any

    /**
     * hides the container or returns false if hiding it is not possible
     */
    hide: () => boolean | undefined

    /**
     * shows the container or returns false if showing it is not possible
     */
    show: () => boolean | undefined

    /**
     * Sets the container to the specified size or returns false if that's not possible
     * @param width the new width in pixel
     * @param height the new height in pixel
     */
    setSize: (width: number, height: number) => void

    /**
     * Sets the item's title to the provided value. Triggers titleChanged and stateChanged events
     * @param title
     */
    setTitle: (title: string) => void

    /**
     * Closes the container or returns false if that is not possible
     */
    close: () => boolean | undefined
}

type ContainerEvents =
    "open"
    | "resize"
    | "destroy"
    | "close"
    | "tab"
    | "hide"
    | "show"



interface Header {
    /**
     * A reference to the LayoutManager instance
     */
    layoutManager: GoldenLayoutObject

    /**
     * A reference to the Stack this Header belongs to
     */
    parent: Item

    /**
     * An array of the Tabs within this header
     */
    tabs: Tab[]

    /**
     * The currently selected item
     */
    activeContentItem: Item

    /**
     * The outer (jQuery) DOM element of this Header
     */
    element: JQuery

    /**
     * The (jQuery) DOM element containing the tabs
     */
    tabsContainer: JQuery

    /**
     * The (jQuery) DOM element containing the close, maximise and popout button
     */
    controlsContainer: JQuery

    /**
     * Hides the currently selected contentItem, shows the specified one and highlights its tab.
     * @param contentItem The content item that will be selected
     */
    setActiveContentItem: (contentItem: Item) => void

    /**
     *
     * @param contentItem The content item the tab will be associated with
     * @param index A zero based index, specifying the position of the new tab
     */
    createTab: (contentItem: Item, index: number) => void

    /**
     * Finds a tab by its contentItem and removes it
     * @param contentItem The content item the tab is associated with
     */
    removeTab: (contentItem: Item) => void

}

interface Tab {
    /**
     * True if this tab is the selected tab
     */
    isActive: boolean

    /**
     * A reference to the header this tab is a child of
     */
    header: Header

    /**
     * A reference to the content item this tab relates to
     */
    contentItem: Item

    /**
     * The tabs outer (jQuery) DOM element
     */
    element: JQuery

    /**
     * The (jQuery) DOM element containing the title
     */
    titleElement: JQuery

    //  TODO the last property is not defined correctly in the docs

    /**
     * Sets the tab's title. Does not affect the contentItem's title!
     * @param title The new title
     */
    setTitle: (title: string) => void

    /**
     * Sets this tab's active state. To programmatically switch tabs, use header.setActiveContentItem( item ) instead.
     * @param isActive Whether the tab is active
     */
    setActive: (isActive: boolean) => void
}