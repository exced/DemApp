import { Component, ViewChild } from '@angular/core';
import { App, ionicBootstrap, Events, Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SignIn } from './pages/auth/signIn';
import { Drawing } from './pages/drawing/drawing';
import { Tabs } from './pages/tabs/tabs';
import { AuthService } from './services/authService';
import { DrawService } from './services/drawService';
import { TutorialPage } from './pages/tutorial/tutorial';
import '../bower_components/Chart.js/dist/Chart.bundle.min.js';

interface PageObject {
  title: string;
  component: any;
  icon: string;
  index?: number;
}

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav  
  @ViewChild(Nav) nav: Nav;

  // if you want tutorial page uncomment below
  // rootPage: any = TutorialPage;
  // and comment here
  rootPage: any = SignIn;

  user;

  /* pages accessible with sidemenu */
  // admin navigation pages
  adminLoggedInPages: PageObject[] = [
  { title: 'Users', component: Tabs, icon: 'contacts' }
  ];

  // User navigation pages
  userLoggedInPages: PageObject[] = [
  { title: 'My patients', component: Tabs, icon: 'contacs' }
  ];

  /* account pages */
  accountPages: PageObject[] = [
  { title: 'Settings', component: Tabs, icon: 'settings', index: 1 },
  { title: 'My account', component: Tabs, icon: 'person', index: 2 }
  ];

  // Guest navigation pages
  guestLoggedInPages: PageObject[] = [
  { title: 'Free drawing', component: Drawing, icon: '' },
  { title: 'Drawing shape', component: Drawing, icon: '' }
  ];

  // Dependency injections
  constructor(private platform: Platform, private events: Events, private menu: MenuController, private authService:AuthService) {
    this.authService.destroyUserCredentials();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });

    // decide which menu items should be shown
    this.listenToLoginEvents();

  }

  openPage(page: PageObject) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {
        user: this.user,
        tabIndex: page.index
      });
    } else {
      this.nav.setRoot(page.component, {
        user: this.user
      });
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', (data) => {
      this.user = data[0].user;
      this.enableMenu(this.user.authority);
    });

    this.events.subscribe('user:signup', (data) => {
      this.user = data[0].user;
      this.enableMenu(this.user.authority);
    });

    this.events.subscribe('user:logout', () => {
      this.nav.setRoot(SignIn);
    });
  }

  enableMenu(userauthority) {
    if (userauthority === 'admin'){
      this.menu.enable(true, 'adminloggedInMenu');
    }
    if (userauthority === 'user'){
      this.menu.enable(true, 'userloggedInMenu');
    }
    if (userauthority === 'guest') {   
      this.menu.enable(true, 'guestloggedInMenu');
    }
  }


}

// Pass the main App component as the first argument
// Pass any providers for your app in the second argument
// Set any config for your app as the third argument, see the docs for
// more ways to configure your app:
// http://ionicframework.com/docs/v2/api/config/Config/
// Place the tabs on the bottom for all platforms
// See the theming docs for the default values:
// http://ionicframework.com/docs/v2/theming/platform-specific-styles/
ionicBootstrap(MyApp, [AuthService, DrawService], {
  tabbarPlacement: 'bottom'
});
