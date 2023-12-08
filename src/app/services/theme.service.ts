import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _renderer: Renderer2; // Renderer to add and remove classes
  private _currentTheme: string = "dark"; // Current theme
  private _currentBrowserColor: string = "#e1e1e1"; // Current browser color for supported browsers
  private _colorSchemePrefixClassName: string = 'color-scheme-'; // CSS class prefix

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: any, private meta: Meta) {
    this._renderer = rendererFactory.createRenderer(null, null);
    // Load preferred or stored theme
    this._load();
  }

  private _load() {
    // If browser dont support any of the following option the default theme is light
    this._currentTheme = "dark";

    // Detect if prefers-color-scheme is supported
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      // Set colorScheme to dark if prefers-color-scheme is dark.
      this._currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
      this._currentBrowserColor = window.matchMedia('(prefers-color-scheme: dark)').matches ? "#1e1e1e" : "#8198b7";
    }

    // Check if any prefers-color-scheme is stored in localStorage
    if (localStorage.getItem('prefers-color')) {
      // Overwrite preferred color theme if explicit theme is set
      this._currentTheme = localStorage.getItem('prefers-color') == 'dark' ? "dark" : "light";
      this._currentBrowserColor = localStorage.getItem('prefers-color') == 'dark' ? "#1e1e1e" : "#8198b7";
    }

    // // Add new CSS class to body
    // this._renderer.addClass(this.document.body, this._colorSchemePrefixClassName + this._currentTheme);
    // this.meta.updateTag({ content: this._currentBrowserColor }, 'name=theme-color');

    this._setTheme(this._currentTheme);
  }

  private _setTheme(theme: string) {
    // Remove old theme
    this._renderer.removeClass(this.document.body, this._colorSchemePrefixClassName + this._currentTheme);

    // Update theme and store explicit choice
    this._currentTheme = theme;
    this._currentBrowserColor = this._currentTheme == "dark" ? "#1e1e1e" : "#8198b7";
    this.meta.updateTag({ content: this._currentBrowserColor }, 'name=theme-color');
    localStorage.setItem('prefers-color', this._currentTheme);

    // Add new CSS class to body
    this._renderer.addClass(this.document.body, this._colorSchemePrefixClassName + this._currentTheme);
  }

  public activateDarkMode() {
    this._setTheme("dark");
  }

  public activateLightMode() {
    this._setTheme("light");
  }

  public get isDarkMode(): boolean {
    return this._currentTheme == "dark";
  }


}
