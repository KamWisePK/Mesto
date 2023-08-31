export class Section {
    constructor({renderer }, containerSelector) {
      
      this._renderer = renderer;
      this._container = containerSelector;
    }
    addItem(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.reverse().forEach((item) => {
            this._renderer(item);
          });
        }
      }




      // export class Section {
      //   constructor({ item, renderer }, containerSelector) {
      //     this._renderedItems = item;
      //     this._renderer = renderer;
      //     this._container = containerSelector;
      //   }
      //   addItem(element) {
      //       this._container.prepend(element);
      //   }
    
      //   renderItems() {
      //       this._renderedItems.forEach((item) => {
      //           this._renderer(item);
      //         });
      //       }
      //     }