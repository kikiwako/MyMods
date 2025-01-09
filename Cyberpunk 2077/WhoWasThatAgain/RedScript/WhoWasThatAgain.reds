module WhoWasThatAgain

/*
  HUDMiddleWidget
    Root <--
      contact_list_slot
        Root
          container
            centralContainer <--
            contactAvatar <--
              AvatarFolder
                Avatar_holder <--
                  avatar_dummy <--
      sms_messenger_slot <--
*/
class MakeAvatarBeegTM extends ScriptableSystem {
  private let LOGGING: Bool = false;
  private let logText: String = "";
  public let logCount: Uint32 = 0u;
  //
  public let contactUiRoot: wref<inkCompoundWidget>;
  //
  public let centralContainer: wref<inkVerticalPanel>;
  public let contactAvatar: wref<inkCompoundWidget>;
  public let avatarHolder: wref<inkCompoundWidget>;
  public let avatarDummy: wref<inkWidget>;
  public let smsMessengerSlot: wref<inkCompoundWidget>;

  public func clearUiElements() {
    this.centralContainer = null;
    this.contactAvatar = null;
    this.avatarHolder = null;
    this.avatarDummy = null;
    this.smsMessengerSlot = null;
  }

  public func areAllUiElementsDefined() -> Bool {
    if !IsDefined(this.contactUiRoot) {
      this.log("contactUiRoot is not defined");
      return false;
    }
    if !IsDefined(this.centralContainer) {
      this.log("centralContainer is not defined");
      return false;
    }
    if !IsDefined(this.contactAvatar) {
      this.log("contactAvatar is not defined");
      return false;
    }
    if !IsDefined(this.avatarHolder) {
      this.log("avatarHolder is not defined");
      return false;
    }
    if !IsDefined(this.avatarDummy) {
      this.log("avatarDummy is not defined");
      return false;
    }
    if !IsDefined(this.smsMessengerSlot) {
      this.log("smsMessengerSlot is not defined");
      return false;
    }

    this.log("All needed UI elements are defined");
    return true;
  }

  public func log(txt: String) {
    this.logInline(s"\n[WhoWasThatAgain] [\(this.logCount)] \(txt)");
  }

  public func logInline(txt: String) {
    if this.LOGGING {
      this.logText += txt;
    }
  }

  public func logAll() {
    if this.LOGGING {
      this.logWidget(this.contactUiRoot);

      this.logWidget(this.centralContainer);
      this.logWidget(this.contactAvatar);
      this.logWidget(this.avatarHolder);
      this.logWidget(this.avatarDummy);
      this.logWidget(this.smsMessengerSlot);
    }
  }

  public func logWidget(widget: wref<inkCompoundWidget>) {
    let scale = widget.GetScale();
    let translation = widget.GetTranslation();
    let shear = widget.GetShear();
    let opacity = widget.GetOpacity();

    this.log("--------------------------");

    this.log(NameToString(widget.GetName()));

    this.log(s"    Scale X:\(scale.X) Y:\(scale.Y)");
    this.log(s"    Translation X:\(translation.X) Y:\(translation.Y)");
    this.log(s"    Shear X:\(shear.X) Y:\(shear.Y)");
    this.log(s"    Opacity :\(opacity)");
  }

  public func logWidget(widget: wref<inkWidget>) {
    let scale = widget.GetScale();
    let translation = widget.GetTranslation();
    let shear = widget.GetShear();
    let opacity = widget.GetOpacity();

    this.log("--------------------------");

    this.log(NameToString(widget.GetName()));

    this.log(s"    Scale X:\(scale.X) Y:\(scale.Y)");
    this.log(s"    Translation X:\(translation.X) Y:\(translation.Y)");
    this.log(s"    Shear X:\(shear.X) Y:\(shear.Y)");
    this.log(s"    Opacity :\(opacity)");
  }

  public func InitWidgets() {
    this.logText = "";
    this.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_\n");

    if this.areAllUiElementsDefined() {
      this.log("Skipping initialization");
      return;
    }

    this.log("Starting initialization");

    let window = GameInstance
      .GetInkSystem()
      .GetLayer(n"inkHUDLayer")
      .GetVirtualWindow();
    let rootWidget = window.GetWidgetByPathName(n"Root") as inkCanvas;

    let numChildren = rootWidget.GetNumChildren();

    if !IsDefined(this.contactUiRoot) {
      this.log("Attempts to find UI Root:");
      this.log(" ");

      let i = 0;

      while i < numChildren && i < 100 {
        let child = rootWidget.GetWidgetByIndex(i);

        // Since Redscript doesn't support continue, keep this in a function for early retrurns
        let didFindWidget = this.findAndSetContactUiRootWidget(child as inkCompoundWidget);

        if didFindWidget {
          // get out of the loop
          i = 999;
        }

        i = i + 1;
      }
    } else {
      this.log("contactUiRoot is already defined");
    }

    this.findAndSetSmsMessengerSlot();
    this.findAndSetCentralContainer();
    this.findAndSetContactAvatar();
    this.findAndSetAvatarHolder();
    this.findAndSetAvatarDummy();
  }

  private func findAndSetContactUiRootWidget(widget: wref<inkCompoundWidget>) -> Bool {
    if !Equals(n"HUDMiddleWidget", widget.GetName()) {
      return false;
    }
    let uselessLogsRemoval = this.logText;

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"Root", n"inkCanvas"]);
    ArrayPush(paths, [n"contact_list_slot", n"inkCanvas"]);

    let root = this.drillDown(widget, [[n"Root", n"inkCanvas"]]);
    let contactListSlot = this.drillDown(root, [[n"contact_list_slot", n"inkCanvas"]]);

    if IsDefined(contactListSlot) {
      this.contactUiRoot = root;
      this.log("        contactUiRoot was found!");
      return true;
    }

    this.logText = uselessLogsRemoval + "X";
    return false;
  }

  private func findAndSetCentralContainer() {
    if IsDefined(this.centralContainer) {
      this.log("centralContainer is already defined");
      return;
    }

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"contact_list_slot", n"inkCanvas"]);
    ArrayPush(paths, [n"Root", n"inkCanvas"]);
    ArrayPush(paths, [n"container", n"inkCanvas"]);
    ArrayPush(paths, [n"centralContainer", n"inkVerticalPanel"]);

    let centralContainer = this.drillDown(this.contactUiRoot, paths) as inkVerticalPanel;

    if IsDefined(centralContainer) {
      this.centralContainer = centralContainer;
      this.log("        centralContainer was found!");
      return;
    }

    this.log("        centralContainer could not be found!");
    return;
  }

  private func findAndSetContactAvatar() {
    if IsDefined(this.contactAvatar) {
      this.log("contactAvatar is already defined");
      return;
    }

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"contact_list_slot", n"inkCanvas"]);
    ArrayPush(paths, [n"Root", n"inkCanvas"]);
    ArrayPush(paths, [n"container", n"inkCanvas"]);
    ArrayPush(paths, [n"contactAvatar", n"inkCanvas"]);

    let contactAvatar = this.drillDown(this.contactUiRoot, paths) as inkCanvas;

    if IsDefined(contactAvatar) {
      this.contactAvatar = contactAvatar;
      this.log("        contactAvatar was found!");
      return;
    }

    this.log("        contactAvatar could not be found!");
    return;
  }

  private func findAndSetSmsMessengerSlot() {
    if IsDefined(this.smsMessengerSlot) {
      this.log("smsMessengerSlot is already defined");
      return;
    }

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"sms_messenger_slot", n"inkCanvas"]);

    let smsMessengerSlot = this.drillDown(this.contactUiRoot, paths) as inkCanvas;

    if IsDefined(smsMessengerSlot) {
      this.smsMessengerSlot = smsMessengerSlot;
      this.log("        smsMessengerSlot was found!");
      return;
    }

    this.log("        smsMessengerSlot could not be found!");
    return;
  }

  private func findAndSetAvatarHolder() {
    if IsDefined(this.avatarHolder) {
      this.log("avatarHolder is already defined");
      return;
    }

    let paths: [[CName]] = [];
    ArrayPush(paths, [n"AvatarFolder", n"inkFlex"]);
    ArrayPush(paths, [n"Avatar_holder", n"inkCanvas"]);

    let avatarHolder = this.drillDown(this.contactAvatar, paths) as inkCanvas;

    if IsDefined(avatarHolder) {
      this.avatarHolder = avatarHolder;
      this.log("        avatarHolder was found!");
      return;
    }

    this.log("        avatarHolder could not be found!");
    return;
  }

  private func findAndSetAvatarDummy() {
    if IsDefined(this.avatarDummy) {
      this.log("avatarDummy is already defined");
      return;
    }

    let avatarDummy = this.avatarHolder.GetWidgetByPathName(n"avatar_dummy") as inkImage;

    if IsDefined(avatarDummy) {
      this.avatarDummy = avatarDummy;
      this.log("        avatarDummy was found!");
      return;
    }

    this.log("        avatarDummy could not be found!");
    return;
  }

  private func drillDown(rootWidget: wref<inkCompoundWidget>, steps: [[CName]]) -> wref<inkCompoundWidget> {
    let currentWidget = rootWidget;

    this.log("Drilling from " + NameToString(rootWidget.GetName()));

    for step in steps {
      this.log("    Searching: " + NameToString(step[0]));

      if Equals(step[1], n"inkCanvas") {
        currentWidget = (currentWidget as inkCompoundWidget).GetWidgetByPathName(step[0]) as inkCanvas;
      } else if Equals(step[1], n"inkFlex") {
        currentWidget = (currentWidget as inkCompoundWidget).GetWidgetByPathName(step[0]) as inkFlex;
      } else if Equals(step[1], n"inkVerticalPanel") {
        currentWidget = (currentWidget as inkCompoundWidget).GetWidgetByPathName(step[0]) as inkVerticalPanel;
      }

      if IsDefined(currentWidget) {
        this.logInline(" - OK!");
      } else {
        this.logInline(" - Failed!");
        return null;
      }
    }

    return currentWidget;
  }

  public func ModifyRenderedContacts() {
    this.InitWidgets();

    if !this.areAllUiElementsDefined() {
      if this.LOGGING {
        LogChannel(n"DEBUG", this.logText);
        this.logCount += 1u;
      }
      return;
    }

    this.logAll();

    this.centralContainer.SetTranslation(new Vector2(225, 0));

    this.contactAvatar.SetScale(new Vector2(2.25, 1.5));
    this.contactAvatar.SetShear(new Vector2(0, -0.3));

    this.avatarHolder.SetScale(new Vector2(0.25, 0.39));
    this.avatarHolder.SetShear(new Vector2(0, 0.43));
    this.avatarHolder.SetTranslation(new Vector2(0, -5.0));

    this.avatarDummy.SetScale(new Vector2(1, 1.025));
    this.avatarDummy.SetTranslation(new Vector2(-2.0, 0.0));
    this.avatarDummy.SetOpacity(0.99);

    this.smsMessengerSlot.SetTranslation(new Vector2(225, 0));

    if this.LOGGING {
      LogChannel(n"DEBUG", this.logText);
      this.logCount += 1u;
    }
  }
}

@wrapMethod(NewHudPhoneGameController)
protected cb func OnSmsMessageLostFocus(evt: ref<UnfocusSmsMessagerEvent>) -> Bool {
  let output = wrappedMethod(evt);
  let delaySystem = GameInstance.GetDelaySystem(GetGameInstance());
  let delay: Float = 0.25;
  let isAffectedByTimeDilation: Bool = false;
  delaySystem.DelayCallback(CustomCallback.Create(), delay, isAffectedByTimeDilation);
  return output;
}

@wrapMethod(NewHudPhoneGameController)
protected cb func OnContactListClosed() -> Bool {
  let output = wrappedMethod();

  let TheSingletonSpecialGoldEditionTm = GameInstance
    .GetScriptableSystemsContainer(GetGameInstance())
    .Get(n"WhoWasThatAgain.MakeAvatarBeegTM") as MakeAvatarBeegTM;

  TheSingletonSpecialGoldEditionTm.clearUiElements();

  return output;
}

@wrapMethod(NewHudPhoneGameController)
protected cb func OnContactListAction(action: ListenerAction, consumer: ListenerActionConsumer) -> Bool {
  let output = wrappedMethod(action, consumer);

  let TheSingletonSpecialGoldEditionTm = GameInstance
    .GetScriptableSystemsContainer(GetGameInstance())
    .Get(n"WhoWasThatAgain.MakeAvatarBeegTM") as MakeAvatarBeegTM;

  TheSingletonSpecialGoldEditionTm.ModifyRenderedContacts();

  return output;
}

@wrapMethod(NewHudPhoneGameController)
protected cb func OnContactListSpawned(widget: ref<inkWidget>, userData: ref<IScriptable>) -> Bool {
  let output = wrappedMethod(widget, userData);

  let delaySystem = GameInstance.GetDelaySystem(GetGameInstance());
  let delay: Float = 0.6;
  let isAffectedByTimeDilation: Bool = false;
  delaySystem.DelayCallback(CustomCallback.Create(), delay, isAffectedByTimeDilation);

  return output;
}

public class CustomCallback extends DelayCallback {
  public func Call() {
    let TheSingletonSpecialGoldEditionTm = GameInstance
      .GetScriptableSystemsContainer(GetGameInstance())
      .Get(n"WhoWasThatAgain.MakeAvatarBeegTM") as MakeAvatarBeegTM;

    TheSingletonSpecialGoldEditionTm.ModifyRenderedContacts();
  }

  public static func Create() -> ref<CustomCallback> {
    let self = new CustomCallback();
    return self;
  }
}
