import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { gt } from '@ember/object/computed';
import Component from '@ember/component';

@classic
export default class AddonVersionListComponent extends Component {
  showAll = false;

  @service
  @service
  emberVersions;

  @computed('versions', 'showAll')
  get showingVersions() {
    if (this.get('showAll')) {
      return this.get('versions');
    }
    return (this.get('versions') || []).slice(0, 10);
  }

  @computed('emberVersions.versions.[]', 'showingVersions.lastObject')
  get emberVersionDataAfterOldestShowingAddonVersion() {
    let oldestVersionDate = this.get('showingVersions.lastObject.released');
    return this.get('emberVersions.versions').filter(version => version.released > oldestVersionDate);
  }

  @computed('emberVersionDataAfterOldestShowingAddonVersion.[]', 'showingVersions.[]')
  get versionsWithMeta() {
    let versions = this.emberVersionDataAfterOldestShowingAddonVersion.map(version => ({ isEmber: true, version }));
    versions = versions.concat(this.showingVersions.map(version => ({ isAddon: true, version })));
    return versions.sortBy('version.released').reverse();
  }

  @gt('versions.length', 10)
  moreThan10Versions;

  @computed('moreThan10Versions', 'showAll')
  get thereAreHiddenVersions() {
    return this.get('moreThan10Versions') && !this.get('showAll');
  }

  @action
  showAllVersions() {
    this.set('showAll', true);
  }
}
