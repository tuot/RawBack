import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const project = readFileSync('RawBack/RawBack.xcodeproj/project.pbxproj', 'utf8');
const iosInfo = readFileSync('RawBack/iOS (App)/Info.plist', 'utf8');
const rawBackApp = readFileSync('RawBack/Shared (App)/RawBackApp.swift', 'utf8');
const appIconImage = readFileSync('RawBack/Shared (App)/AppIconImage.swift', 'utf8');
const setupGuideView = readFileSync('RawBack/Shared (App)/SetupGuideView.swift', 'utf8');
const setupGuideModel = readFileSync('RawBack/Shared (App)/SetupGuideModel.swift', 'utf8');
const setupGuideStep = readFileSync('RawBack/Shared (App)/SetupGuideStep.swift', 'utf8');
const setupGuideStepCard = readFileSync('RawBack/Shared (App)/SetupGuideStepCard.swift', 'utf8');
const localizable = readFileSync('RawBack/Shared (App)/Localizable.xcstrings', 'utf8');

for (const deletedPath of [
  'RawBack/iOS (App)/Base.lproj',
  'RawBack/iOS (App)/Base.lproj/LaunchScreen.storyboard',
  'RawBack/iOS (App)/Base.lproj/Main.storyboard',
  'RawBack/macOS (App)/Base.lproj/Main.storyboard',
  'RawBack/iOS (App)/AppDelegate.swift',
  'RawBack/iOS (App)/SceneDelegate.swift',
  'RawBack/macOS (App)/AppDelegate.swift',
  'RawBack/Shared (App)/ViewController.swift',
  'RawBack/Shared (App)/Resources/Base.lproj/Main.html',
  'RawBack/Shared (App)/Resources/Script.js',
  'RawBack/Shared (App)/Resources/Style.css',
  'RawBack/Shared (App)/LocalizedStringKey+RawBack.swift',
]) {
  assert.equal(existsSync(deletedPath), false, `${deletedPath} should be removed`);
}

assert.match(rawBackApp, /@main\s+struct RawBackApp: App/);
assert.match(rawBackApp, /WindowGroup\s*\{\s*SetupGuideView\(\)/);
assert.match(rawBackApp, /@NSApplicationDelegateAdaptor\(MacLifecycleDelegate\.self\)/);

assert.match(project, /AppIconImage\.swift/);
assert.doesNotMatch(setupGuideView, /Image\("Icon"\)/);
assert.match(setupGuideView, /AppIconImage\(\)/);
assert.match(appIconImage, /Bundle\.main\.url\(forResource: "Icon", withExtension: "png"\)/);
assert.match(appIconImage, /UIImage\(contentsOfFile: url\.path\)/);
assert.match(appIconImage, /NSImage\(contentsOf: url\)/);

assert.ok(setupGuideView.includes('Text("Jump from raw files back to their repositories.")'));
assert.ok(setupGuideView.includes('Text("You can manage RawBack from Settings > Safari > Extensions.")'));
assert.match(setupGuideView, /Button\(settingsButtonTitle, action: model\.openSafariSettings\)/);
assert.match(setupGuideStep, /title: "Open Safari settings"/);
assert.match(setupGuideStep, /message: firstStepMessage/);
assert.match(setupGuideStepCard, /Text\(step\.title\)/);
assert.match(setupGuideStepCard, /Text\(step\.message\)/);

assert.match(setupGuideModel, /SFSafariExtensionManager\.getStateOfSafariExtension/);
assert.match(setupGuideModel, /SFSafariApplication\.showPreferencesForExtension/);
assert.match(setupGuideModel, /NSApp\.terminate/);

assert.doesNotMatch(iosInfo, /UIApplicationSceneManifest/);
assert.doesNotMatch(project, /ViewController\.swift/);
assert.doesNotMatch(project, /AppDelegate\.swift/);
assert.doesNotMatch(project, /SceneDelegate\.swift/);
assert.doesNotMatch(project, /Main\.html/);
assert.doesNotMatch(project, /Script\.js/);
assert.doesNotMatch(project, /Style\.css/);
assert.doesNotMatch(project, /INFOPLIST_KEY_UIMainStoryboardFile/);
assert.doesNotMatch(project, /INFOPLIST_KEY_NSMainStoryboardFile/);
assert.doesNotMatch(project, /INFOPLIST_KEY_UILaunchStoryboardName/);
assert.doesNotMatch(project, /LaunchScreen\.storyboard/);
assert.match(project, /INFOPLIST_KEY_UILaunchScreen_Generation = YES;/);
assert.doesNotMatch(project, /Base,/);
assert.doesNotMatch(project, /WebKit/);
assert.doesNotMatch(project, /LocalizedStringKey\+RawBack\.swift/);

for (const key of [
  'Jump from raw files back to their repositories.',
  'Open Safari settings',
  'Open Safari Extensions from the button below.',
  'Open Settings and choose Safari.',
  'Enable RawBack',
  'Find RawBack in the extension list and turn it on.',
  'Allow website access',
  'Allow RawBack to access GitHub, GitLab, and other supported sites.',
  'RawBack is enabled',
  'You can close this app and use RawBack in Safari.',
  'RawBack is not enabled',
  'Follow the steps above to enable the Safari extension.',
  'Check Safari extension settings',
  'Open Safari settings to confirm RawBack is enabled.',
  'Quit and Open Safari Settings...',
  'Quit and Open Safari Preferences...',
  'You can manage RawBack from Settings > Safari > Extensions.',
]) {
  assert.match(localizable, new RegExp(`${JSON.stringify(key)}\\s*:`));
}

for (const dedicatedKey of [
  'appSubtitle',
  'step1Title',
  'step1DescMac',
  'step1DescIOS',
  'step2Title',
  'step2Desc',
  'step3Title',
  'step3Desc',
  'statusSuccessTitle',
  'statusSuccessDesc',
  'statusWarningTitle',
  'statusWarningDesc',
  'statusUnknownTitle',
  'statusUnknownDesc',
  'quitAndOpenSafariSettings',
  'quitAndOpenSafariPreferences',
  'iosInstruction',
]) {
  assert.doesNotMatch(localizable, new RegExp(`${JSON.stringify(dedicatedKey)}\\s*:`));
}

for (const language of ['en', 'zh-Hans', 'ja', 'ko', 'es', 'fr', 'de', 'ru']) {
  assert.match(localizable, new RegExp(`"${language}"\\s*:`));
}
