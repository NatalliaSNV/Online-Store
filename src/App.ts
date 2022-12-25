import { MainPageView } from './components/MainPageView';
import { DetailPageView } from './components/DetailPageView';
import { ControllerMainPage } from './components/MainPageController';
import { ControllerDetailPage } from './components/DetailPageController';

export class App {
    view: MainPageView | DetailPageView | undefined;
    controller: ControllerMainPage | ControllerDetailPage | undefined;

    init() {
        window.addEventListener('hashchange', this.navigate);
        this.navigate();
    }

    navigate = () => {
        const path = window.location.hash.slice(1).split('/');
        console.log(path[0]);
        switch (path[0]) {
            case 'details':
                this.view = new DetailPageView();
                this.controller = new ControllerDetailPage(this.view);
                console.log('Detail');
                break;
            default:
                this.view = new MainPageView();
                this.controller = new ControllerMainPage(this.view);
                console.log('Main');
                break;
        }
    };
}
