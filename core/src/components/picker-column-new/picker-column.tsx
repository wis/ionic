import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';
import { PickerColumn } from '../../interface';
/**
 * @internal
 */
@Component({
  tag: 'ion-picker-column-new',
  styleUrls: {
    ios: 'picker-column.ios.scss',
    md: 'picker-column.md.scss'
  }
})
export class PickerColumnCmp implements ComponentInterface {
  @Element() el!: HTMLElement;

  @Event() ionChange!: EventEmitter<any>;
  
  @Prop() value?: any;
  @Watch('value')
  protected valueChanged() {
    const value = this.value;
    this.ionChange.emit({ value });
    
    const opts = getAllOptions(this.el);
    const elementToSelect = opts.find(o => o.value === value);
    
    if (elementToSelect) {
      elementToSelect.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  /** Picker column data */
  @Prop() col!: PickerColumn;
  @Watch('col')
  protected colChanged() {
  }

  async connectedCallback() {
  }

  componentDidLoad() {

  }
  
  onClick(ev: Event) {
    const el = ev.target as any;
    this.value = el.value;
  }

  render() {
    
    const col = this.col;
    const mode = getIonMode(this);
    return (
      <Host
        class={{
          [mode]: true,
          'picker-col': true,
          'picker-opts-left': col.align === 'left',
          'picker-opts-right': col.align === 'right'
        }}
        style={{
          'max-width': col.columnWidth
        }}
      >        
        { mode === 'ios' && <div class="picker-above-highlight"></div> }
        
        <div class="picker-opts">
          { col.options.map(o =>
            <ion-picker-column-option
              value={o.value}
              text={o.text}
              disabled={o.disabled}
              onClick={(ev) => this.onClick(ev)}
            ></ion-picker-column-option>
          )}
        </div>
        
        { mode === 'ios' && <div class="picker-below-highlight"></div> }
      </Host>
    );
  }
}

const getAllOptions = (ref: HTMLElement) => {
  return Array.from(ref.querySelectorAll('ion-picker-column-option'));
}