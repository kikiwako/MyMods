
// native func LogChannel(channel: CName, const text: script_ref<String>);
class MakeAvatarBeegTM {
  public let centralContainer: wref<inkVerticalPanel>;
  public let contactAvatar: wref<inkCompoundWidget>;
  public let avatarHolder: wref<inkCompoundWidget>;
  public let avatarDummy: wref<inkWidget>;

  // public func logAll() {
  //   this.logWidget(this.centralContainer);
  //   this.logWidget(this.contactAvatar);
  //   this.logWidget(this.avatarHolder);
  //   this.logWidget(this.avatarDummy);
  //   LogChannel(
  //     n"DEBUG",
  //     "_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_"
  //   );
  // }
  // public func logWidget(widget: wref<inkCompoundWidget>) {
  //   let log = "--------------------------";
  //   let scale = widget.GetScale();
  //   log += "\n" + NameToString(widget.GetName());
  //   log += "\nScale X:" + scale.X + " Y:" + scale.Y;
  //   LogChannel(n"DEBUG", log);
  // }
  // public func logWidget(widget: wref<inkWidget>) {
  //   let log = "--------------------------";
  //   let scale = widget.GetScale();
  //   log += "\n" + NameToString(widget.GetName());
  //   log += "\nScale X:" + scale.X + " Y:" + scale.Y;
  //   LogChannel(n"DEBUG", log);
  // }
  public func InitWidgets() {
    if IsDefined(this.contactAvatar) {
      return;
    }

    let window = GameInstance
      .GetInkSystem()
      .GetLayer(n"inkHUDLayer")
      .GetVirtualWindow();
    let rootWidget = window.GetWidgetByPathName(n"Root") as inkCanvas;

    let numChildren = rootWidget.GetNumChildren();

    let i = 0;
    while i < numChildren && i < 100 {
      let child = rootWidget.GetWidgetByIndex(i);
      // Since Redscript doesn't support continue, keep this in a function for early retrurns
      let didFindWidget = this.CheckWidget(child as inkCompoundWidget);

      if didFindWidget {
        return;
      }

      i = i + 1;
    }
  }

  private func CheckWidget(widget: wref<inkCompoundWidget>) -> Bool {
    if !Equals(n"HUDMiddleWidget", widget.GetName()) {
      return false;
    }

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"Root", n"inkCanvas"]);
    ArrayPush(paths, [n"contact_list_slot", n"inkCanvas"]);
    ArrayPush(paths, [n"Root", n"inkCanvas"]);
    ArrayPush(paths, [n"container", n"inkCanvas"]);
    ArrayPush(paths, [n"centralContainer", n"inkVerticalPanel"]);
    ArrayPush(paths, [n"contactAvatar", n"inkCanvas"]);
    ArrayPush(paths, [n"AvatarFolder", n"inkFlex"]);
    ArrayPush(paths, [n"Avatar_holder", n"inkCanvas"]);
    ArrayPush(paths, [n"avatar_dummy", n"inkImage"]);

    let currentWidget = widget;
    let imageWidget: wref<inkImage>;
    let panelWidget: wref<inkVerticalPanel>;

    // let log = "";

    for step in paths {
      // log += "\nSearching: " + NameToString(step[0]);

      if Equals(step[1], n"inkCanvas") {
        currentWidget = currentWidget.GetWidgetByPathName(step[0]) as inkCanvas;
      } else if Equals(step[1], n"inkFlex") {
        currentWidget = currentWidget.GetWidgetByPathName(step[0]) as inkFlex;
      } else if Equals(step[1], n"inkImage") {
        imageWidget = currentWidget.GetWidgetByPathName(step[0]) as inkImage;
      } else if Equals(step[1], n"inkVerticalPanel") {
        panelWidget = currentWidget.GetWidgetByPathName(step[0]) as inkVerticalPanel;
      }

      if !IsDefined(currentWidget) {
        // log += "\n- - - Failed!";
        // LogChannel(n"DEBUG", log);
        return false;
      }

      // log += " - OK!";

      if Equals(step[0], n"contactAvatar") {
        // log += " - Saved contactAvatar";
        this.contactAvatar = currentWidget;
      } else if Equals(step[0], n"Avatar_holder") {
        // log += " - Saved Avatar_holder";
        this.avatarHolder = currentWidget;
      } else if Equals(step[0], n"avatar_dummy") {
        // log += " - Saved avatar_dummy";
        this.avatarDummy = imageWidget;
      } else if Equals(step[0], n"centralContainer") {
        // log += " - Saved centralContainer";
        this.centralContainer = panelWidget;
      }
    }

    if !IsDefined(this.contactAvatar) {
      // log += "\n- - - Failed!";
      // LogChannel(n"DEBUG", log);
      return false;
    }
    if !IsDefined(this.avatarHolder) {
      // log += "\n- - - Failed!";
      // LogChannel(n"DEBUG", log);
      return false;
    }
    if !IsDefined(this.avatarDummy) {
      // log += "\n- - - Failed!";
      // LogChannel(n"DEBUG", log);
      return false;
    }

    // log += "\n+ + + Success!";
    // LogChannel(n"DEBUG", log);

    return true;
  }

  public func ModifyRenderedContacts() {
    this.InitWidgets();

    if !IsDefined(this.contactAvatar) {
      // LogChannel(n"DEBUG", "this.contactAvatar is not defined");
      return;
    }
    if !IsDefined(this.avatarHolder) {
      // LogChannel(n"DEBUG", "this.avatarHolder is not defined");
      return;
    }
    if !IsDefined(this.avatarDummy) {
      // LogChannel(n"DEBUG", "this.avatarDummy is not defined");
      return;
    }

    // this.logAll();

    this.centralContainer.SetTranslation(new Vector2(225, 0));

    this.contactAvatar.SetScale(new Vector2(2.25, 1.5));
    this.contactAvatar.SetShear(new Vector2(0, -0.3));

    this.avatarHolder.SetScale(new Vector2(0.25, 0.39));
    this.avatarHolder.SetShear(new Vector2(0, 0.43));
    this.avatarHolder.SetTranslation(new Vector2(0, -5.0));

    this.avatarDummy.SetScale(new Vector2(1, 1.025));
    this.avatarDummy.SetTranslation(new Vector2(-2.0, 0.0));
    this.avatarDummy.SetOpacity(0.99);
  }
}

// this.logAll();
@wrapMethod(NewHudPhoneGameController)
protected cb func OnContactListAction(action: ListenerAction, consumer: ListenerActionConsumer) -> Bool {
  let result = wrappedMethod(action, consumer);
  let beegener = new MakeAvatarBeegTM();
  beegener.ModifyRenderedContacts();
  return result;
}

@wrapMethod(NewHudPhoneGameController)
protected cb func OnContactListSpawned(widget: ref<inkWidget>, userData: ref<IScriptable>) -> Bool {
  let result = wrappedMethod(widget, userData);

  let delaySystem = GameInstance.GetDelaySystem(GetGameInstance());
  let delay: Float = 0.6;
  let isAffectedByTimeDilation: Bool = false;

  delaySystem.DelayCallback(CustomCallback.Create(), delay, isAffectedByTimeDilation);

  return result;
}

public class CustomCallback extends DelayCallback {
  public func Call() {
    let beegener = new MakeAvatarBeegTM();
    beegener.ModifyRenderedContacts();
  }

  public static func Create() -> ref<CustomCallback> {
    let self = new CustomCallback();
    return self;
  }
}
