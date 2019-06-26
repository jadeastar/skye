import { BrowserWindow, app, ipcMain } from 'electron';
import { join } from 'path';
import { AppWindow } from './app-window';
import { TOOLBAR_HEIGHT } from '~/renderer/app/constants/design';

const WIDTH = 400;
const HEIGHT = 64;

export class FindWindow extends BrowserWindow {
  constructor(public appWindow: AppWindow) {
    super({
      frame: false,
      resizable: false,
      width: WIDTH,
      height: HEIGHT,
      transparent: true,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      skipTaskbar: true,
    });

    if (process.env.ENV === 'dev') {
      this.webContents.openDevTools({ mode: 'detach' });
      this.loadURL('http://localhost:4444/find.html');
    } else {
      this.loadURL(join('file://', app.getAppPath(), 'build/find.html'));
    }

    this.setParentWindow(this.appWindow);
  }

  public show() {
    this.rearrange();
    super.show();
  }

  public rearrange() {
    const cBounds = this.appWindow.getContentBounds();
    this.setBounds({
      x: Math.round(cBounds.x + cBounds.width - WIDTH),
      y: cBounds.y + TOOLBAR_HEIGHT,
    } as any);
  }
}