var Ipc=require("ipc"),BrowserWindow=require("browser-window"),PanelMng={},_panelIDToWindows={},_panelIDToArgv={};Ipc.on("panel:ready",function(a,b){var c=b.split("@");if(2!==c.length)return Fire.error("Invalid panelID "+b),void a({});var d=c[0],e=c[1],f=Fire.PackageManager.getPackageInfo(e);if(!f)return Fire.error("Invalid package info "+e),void a({});if(!f.fireball)return Fire.error("Invalid package info %s, can not find fireball property",e),void a({});if(!f.fireball.panels)return Fire.error("Invalid package info %s, can not find panels property",e),void a({});if(!f.fireball.panels[d])return Fire.error("Invalid package info %s, can not find %s property",e,d),void a({});var g=f.fireball.panels[d],h=Fire.PackageManager.getPackagePath(e),i=_panelIDToArgv[b];a({"panel-id":b,"panel-info":g,"package-path":h,argv:i})}),Ipc.on("panel:dock",function(a,b){var c=BrowserWindow.fromWebContents(a.sender),d=Fire.Window.find(c);PanelMng.dock(b,d)}),Ipc.on("panel:undock",function(a,b){var c=BrowserWindow.fromWebContents(a.sender),d=Fire.Window.find(c);PanelMng.undock(b,d)}),Ipc.on("panel:query-settings",function(a,b){var c=b.id,d=b.settings;d=Fire.loadProfile(c,"global",d),a(d)}),Ipc.on("panel:save-settings",function(a){var b=a.id,c=a.settings,d=Fire.loadProfile(b,"global");if(d){var e=d.save;d=c,d.save=e,d.save()}}),PanelMng.open=function(a,b,c,d){var e=b+"@"+a;_panelIDToArgv[e]=d;var f=PanelMng.findWindow(a,b);if(f)return Fire.sendToPanel(a,b,"panel:open",d),f.show(),void f.focus();var g="plugin-window-"+(new Date).getTime(),h={"use-content-size":!0,width:c.width,height:c.height,"min-width":c["min-width"],"min-height":c["min-height"],"max-width":c["max-width"],"max-height":c["max-height"]},i=Fire.loadProfile("layout","local"),j=i.panels;if(i.panels&&i.panels[e]){var k=i.panels[e];if(g=k.window,f=Fire.Window.find(g))return;h.x=k.x,h.y=k.y,h.width=k.width,h.height=k.height}var l="fire://static/window.html",m=c.type||"dockable";switch(c.type){case"dockable":h.resizable=!0,h["always-on-top"]=!1;break;case"float":h.resizable=!0,h["always-on-top"]=!0;break;case"fixed-size":h.resizable=!1,h["always-on-top"]=!0}f=new Fire.Window(g,h),f.nativeWin.setContentSize(h.width,h.height),f.nativeWin.setMenuBarVisibility(!1),f.load(l,{panelID:e}),f.focus()},PanelMng.findWindow=function(a,b){var c=b+"@"+a;return _panelIDToWindows[c]},PanelMng.findWindows=function(a){var b=[];for(var c in _panelIDToWindows){var d=c.split("@");if(2===d.length){var e=d[1];if(e===a){var f=_panelIDToWindows[c];-1===b.indexOf(f)&&b.push(f)}}}return b},PanelMng.findPanels=function(a){var b=[];for(var c in _panelIDToWindows){var d=c.split("@");if(2===d.length){var e=d[1];e===a&&b.push(d[0])}}return b},PanelMng.dock=function(a,b){_panelIDToWindows[a]=b},PanelMng.undock=function(a,b){var c=_panelIDToWindows[a];return c===b?delete _panelIDToWindows[a]:!1},PanelMng.closeAll=function(a){Fire.warn("TODO: @Johnny please implement PanelMng.closeAll")},PanelMng._onWindowClosed=function(a){for(var b in _panelIDToWindows){var c=_panelIDToWindows[b];c===a&&delete _panelIDToWindows[b]}},module.exports=PanelMng;