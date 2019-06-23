import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('')
export default class SearchResultSetComponent extends Component {
  resultsCollapsed = false;

  toggleResultsExpansion() {
    this.toggleProperty('resultsCollapsed');
  }
}
