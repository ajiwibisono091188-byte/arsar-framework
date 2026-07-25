/**
 * LayoutManager Class
 */
export class LayoutManager {
  constructor() {
    this.layoutConfig = {
      sidebarWidth: '240px',
      topbarHeight: '60px',
      rightPanelWidth: '300px',
      statusbarHeight: '24px'
    };
  }

  /**
   * Return visual container classes or styling
   */
  getGridConfig() {
    return {
      columns: `${this.layoutConfig.sidebarWidth} 1fr ${this.layoutConfig.rightPanelWidth}`,
      rows: `${this.layoutConfig.topbarHeight} 1fr ${this.layoutConfig.statusbarHeight}`,
      areas: {
        topbar: "topbar topbar topbar",
        sidebar: "sidebar workspace rightpanel",
        statusbar: "statusbar statusbar statusbar"
      }
    };
  }
}
export const layoutManager = new LayoutManager();
