import * as v1Controllers from './v1';
import VersionController from './VersionController';
import BaseController from './BaseController';

class MainController extends BaseController {
  public init(): void {
    const versionController = new VersionController();
    versionController.init();
    this.router.use('/version', versionController.getRouter());

    for (const [controllerName, Controller] of Object.entries(v1Controllers)) {
      const routeName = controllerName.replace('Controller', '');
      const controller = new Controller();

      controller.init();

      this.router.use(`/v1/${routeName}`, controller.getRouter());
    }
  }
}

export default MainController;
