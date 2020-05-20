'use babel';

import LanguageAmclView from './language-amcl-view';
import { CompositeDisposable } from 'atom';

export default {

  languageAmclView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageAmclView = new LanguageAmclView(state.languageAmclViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageAmclView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-amcl:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageAmclView.destroy();
  },

  serialize() {
    return {
      languageAmclViewState: this.languageAmclView.serialize()
    };
  },

  toggle() {
    console.log('LanguageAmcl was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
