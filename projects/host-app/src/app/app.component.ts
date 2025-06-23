import {
  Component,
  ViewChild,
  ViewContainerRef,
  createComponent,
  Type,
  EnvironmentInjector,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'host-app';

  @ViewChild('searchContainer', { read: ViewContainerRef, static: true })
  searchContainer!: ViewContainerRef;

  @ViewChild('bannerContainer', { read: ViewContainerRef, static: true })
  bannerContainer!: ViewContainerRef;

  constructor(private envInjector: EnvironmentInjector) {}

  async ngOnInit() {
    const searchModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:4300/remoteEntry.js',
      exposedModule: './SearchComponent',
      type: 'module',
    });

    const bannerModule = await loadRemoteModule({
      remoteEntry: 'http://localhost:4400/remoteEntry.js',
      exposedModule: './BannerComponent',
      type: 'module',
    });

    const searchComponent = createComponent(
      searchModule.SearchComponent as Type<any>,
      {
        environmentInjector: this.envInjector,
      }
    );
    this.searchContainer.insert(searchComponent.hostView);

    const bannerComponent = createComponent(
      bannerModule.BannerComponent as Type<any>,
      {
        environmentInjector: this.envInjector,
      }
    );
    this.bannerContainer.insert(bannerComponent.hostView);
  }
}
