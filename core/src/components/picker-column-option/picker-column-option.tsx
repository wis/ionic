import { Component, ComponentInterface, Element, Host, Prop, State, h } from '@stencil/core';

import { getIonMode } from '../../global/ionic-global';

/**
 * @internal
 */
@Component({
  tag: 'ion-picker-column-option',
  styleUrls: {
    ios: 'picker-column-option.ios.scss',
    md: 'picker-column-option.md.scss'
  }
})
export class PickerColumnOptionCmp implements ComponentInterface {
  private pickerColumn: any | null = null;

  @Element() el!: HTMLElement;
  
  @State() selected: boolean = false;

  @Prop() text?: string;
  @Prop() value?: any;
  @Prop() disabled?: boolean = false;
  
  connectedCallback() {
    const pickerColumn = this.pickerColumn = this.el.closest('ion-picker-column-new');
    if (pickerColumn) {
      pickerColumn.addEventListener('ionChange', this.updateState);
    }
  }
  
  disconnectedCallback() {
    const pickerColumn = this.pickerColumn;
    if (pickerColumn) {
      pickerColumn.removeEventListener('ionChange', this.updateState);
      this.pickerColumn = null;
    }
  }
  
  private updateState = () => {
    if (this.pickerColumn) {
      this.selected = this.pickerColumn.value === this.value;
    }
  } 

  render() {
    const { text, value, disabled, selected } = this;
    const Button = 'button' as any;
    const mode = getIonMode(this);
    return (
      <Host
        class={{
          [mode]: true,
          "picker-opt": true,
          "picker-opt-selected": selected
        }}
      >
        <Button
          type="button"
          disabled={disabled}
          value={value}
        >
          {text}
        </Button>
      </Host>
    );
  }
}