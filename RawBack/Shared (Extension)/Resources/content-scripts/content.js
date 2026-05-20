var content=(function(){function e(e){return e}var t=[`raw.githubusercontent.com`],n=[`gitlab.com`],r=[`gitea.com`,`codeberg.org`];function i(e,t={}){let n;try{n=new URL(e)}catch{return null}let r=a(n)??o(n,t)??s(n,t);return!r||t.disabledPlatforms?.includes(r.platform)?null:r}function a(e){if(!new Set(t).has(e.hostname))return null;let n=c(e.pathname);if(n.length<4)return null;let[r,i,a,...o]=n;if(!r||!i||!a||o.length===0)return null;let s=o.join(`/`),u=`${e.protocol}//github.com/${l([r,i])}`;return{platform:`github`,user:r,repo:i,branch:a,filePath:s,repoUrl:u,fileUrl:`${u}/blob/${l([a,s])}`}}function o(e,t){if(!new Set([...n,...t.selfHostedGitlabHosts??[]]).has(e.hostname))return null;let r=c(e.pathname),i=u(r);if(i<2)return null;let a=r.slice(0,i),o=a.at(-1),s=a.slice(0,-1).join(`/`),f=d(r.slice(i+2));if(!s||!o||!f)return null;let p=l(a),m=`${e.protocol}//${e.host}/${p}`;return{platform:`gitlab`,user:s,repo:o,branch:f.branch,filePath:f.filePath,repoUrl:m,fileUrl:`${m}/-/blob/${l([f.branch,f.filePath])}`}}function s(e,t){if(!new Set([...r,...t.selfHostedGiteaHosts??[]]).has(e.hostname))return null;let n=c(e.pathname);if(n.length<5||n[2]!==`raw`)return null;let[i,a,,o,...s]=n;if(!o||s.length===0)return null;let u=d(s);if(!i||!a||!u)return null;let f=`${e.protocol}//${e.host}/${l([i,a])}`;return{platform:`gitea`,user:i,repo:a,branch:u.branch,filePath:u.filePath,repoUrl:f,fileUrl:`${f}/src/${o}/${l([u.branch,u.filePath])}`}}function c(e){return e.split(`/`).filter(Boolean).map(e=>decodeURIComponent(e))}function l(e){return e.flatMap(e=>e.split(`/`)).map(e=>encodeURIComponent(e)).join(`/`)}function u(e){for(let t=0;t<e.length-1;t+=1)if(e[t]===`-`&&e[t+1]===`raw`)return t;return-1}function d(e){if(e.length<2)return null;let t=f(e),n=e.slice(0,t),r=e.slice(t);return n.length===0||r.length===0?null:{branch:n.join(`/`),filePath:r.join(`/`)}}function f(e){let t=new Set([`bugfix`,`chore`,`develop`,`feature`,`fix`,`hotfix`,`release`]);return e.length>=3&&t.has(e[0])?2:1}var p=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,m={enabled:!0,theme:`system`,disabledHosts:[],dismissedFiles:[],language:`auto`,disabledPlatforms:[],selfHostedGitlabHosts:[],selfHostedGiteaHosts:[]},h=null;async function g(){return h||(h=v(await p.storage.sync.get(m)),h)}function _(e){p.storage.onChanged.addListener((t,n)=>{n===`sync`&&Object.keys(m).some(e=>e in t)&&(h=null,g().then(e))})}function v(e){return{enabled:typeof e.enabled==`boolean`?e.enabled:m.enabled,theme:x(e.theme)?e.theme:m.theme,disabledHosts:y(e.disabledHosts),dismissedFiles:y(e.dismissedFiles).slice(0,200),language:S(e.language)?e.language:m.language,disabledPlatforms:b(e.disabledPlatforms),selfHostedGitlabHosts:y(e.selfHostedGitlabHosts).map(e=>e.trim()).filter(Boolean),selfHostedGiteaHosts:y(e.selfHostedGiteaHosts).map(e=>e.trim()).filter(Boolean)}}function y(e){return Array.isArray(e)?e.filter(e=>typeof e==`string`):[]}function b(e){let t=new Set([`github`,`gitlab`,`gitea`]);return y(e).filter(e=>t.has(e))}function x(e){return e===`system`||e===`light`||e===`dark`}function S(e){return typeof e==`string`&&[`auto`,`en`,`zh_CN`,`ja`,`ko`,`es`,`fr`,`de`,`ru`].includes(e)}var C={en:{extensionDescription:`Jump from raw Git hosting files back to their repository pages.`,bannerAriaLabel:`RawBack repository navigation`,openRepositoryFileAriaLabel:`View this file in the repository`,openInRepository:`View in repository`,dismissThisFile:`Hide this file`,hiddenFiles:`Hidden files`,hiddenFilesEmpty:`No permanently hidden files.`,restore:`Restore`,restored:`Restored`,enabled:`Enabled`,disabled:`Disabled`,currentPage:`Current page`,rawPage:`Raw file detected`,notRawPage:`This page is not a raw file.`,openRepository:`Open repository`,appearance:`Appearance`,theme:`Theme`,themeSystem:`System`,themeLight:`Light`,themeDark:`Dark`,platforms:`Platforms`,language:`Language`,languageAuto:`Auto`,languageEnglish:`English`,languageChinese:`Chinese`,languageJapanese:`Japanese`,languageKorean:`Korean`,languageSpanish:`Spanish`,languageFrench:`French`,languageGerman:`German`,languageRussian:`Russian`,customDomains:`Custom Domains`,customDomainsHint:`Enter domain or URL`,add:`Add`,invalidDomain:`Invalid domain or URL`,save:`Save`,settingsSaved:`Saved`},zh_CN:{extensionDescription:`从 Git raw 文件页面一键回到对应仓库页面。`,bannerAriaLabel:`RawBack 仓库导航`,openRepositoryFileAriaLabel:`在仓库中查看当前文件`,openInRepository:`在仓库中查看`,dismissThisFile:`隐藏此文件`,hiddenFiles:`已隐藏文件`,hiddenFilesEmpty:`没有永久隐藏的文件。`,restore:`恢复`,restored:`已恢复`,enabled:`已启用`,disabled:`已禁用`,currentPage:`当前页面`,rawPage:`已识别 raw 文件`,notRawPage:`当前页面不是 raw 文件。`,openRepository:`打开仓库`,appearance:`外观`,theme:`主题`,themeSystem:`跟随系统`,themeLight:`亮色`,themeDark:`暗色`,platforms:`平台管理`,language:`语言`,languageAuto:`跟随系统`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`自定义私有域名`,customDomainsHint:`输入域名或包含该域名的URL`,add:`添加`,invalidDomain:`无效的域名或URL`,save:`保存`,settingsSaved:`已保存`},ja:{extensionDescription:`Gitホスティングのrawファイルからリポジトリページに戻ります。`,bannerAriaLabel:`RawBackリポジトリナビゲーション`,openRepositoryFileAriaLabel:`リポジトリでこのファイルを表示`,openInRepository:`リポジトリで表示`,dismissThisFile:`このファイルを隠す`,hiddenFiles:`非表示ファイル`,hiddenFilesEmpty:`完全に非表示のファイルはありません。`,restore:`復元`,restored:`復元しました`,enabled:`有効`,disabled:`無効`,currentPage:`現在のページ`,rawPage:`Rawファイルを検出`,notRawPage:`このページはRawファイルではありません。`,openRepository:`リポジトリを開く`,appearance:`外観`,theme:`テーマ`,themeSystem:`システム`,themeLight:`ライト`,themeDark:`ダーク`,platforms:`プラットフォーム`,language:`言語`,languageAuto:`自動`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`カスタムドメイン`,customDomainsHint:`ドメインまたはURLを入力`,add:`追加`,invalidDomain:`無効なドメインまたはURL`,save:`保存`,settingsSaved:`保存しました`},ko:{extensionDescription:`Git 호스팅 raw 파일에서 저장소 페이지로 돌아갑니다.`,bannerAriaLabel:`RawBack 저장소 탐색`,openRepositoryFileAriaLabel:`저장소에서 이 파일 보기`,openInRepository:`저장소에서 보기`,dismissThisFile:`이 파일 숨기기`,hiddenFiles:`숨긴 파일`,hiddenFilesEmpty:`숨긴 파일이 없습니다.`,restore:`복원`,restored:`복원됨`,enabled:`활성화됨`,disabled:`비활성화됨`,currentPage:`현재 페이지`,rawPage:`Raw 파일 감지됨`,notRawPage:`이 페이지는 Raw 파일이 아닙니다.`,openRepository:`저장소 열기`,appearance:`모양`,theme:`테마`,themeSystem:`시스템`,themeLight:`라이트`,themeDark:`다크`,platforms:`플랫폼`,language:`언어`,languageAuto:`자동`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`사용자 지정 도메인`,customDomainsHint:`도메인 또는 URL 입력`,add:`추가`,invalidDomain:`잘못된 도메인 또는 URL`,save:`저장`,settingsSaved:`저장됨`},es:{extensionDescription:`Vuelve de los archivos raw a las páginas de su repositorio.`,bannerAriaLabel:`Navegación del repositorio RawBack`,openRepositoryFileAriaLabel:`Ver este archivo en el repositorio`,openInRepository:`Ver en el repositorio`,dismissThisFile:`Ocultar este archivo`,hiddenFiles:`Archivos ocultos`,hiddenFilesEmpty:`No hay archivos ocultos.`,restore:`Restaurar`,restored:`Restaurado`,enabled:`Activado`,disabled:`Desactivado`,currentPage:`Página actual`,rawPage:`Archivo raw detectado`,notRawPage:`Esta página no es un archivo raw.`,openRepository:`Abrir repositorio`,appearance:`Apariencia`,theme:`Tema`,themeSystem:`Sistema`,themeLight:`Claro`,themeDark:`Oscuro`,platforms:`Plataformas`,language:`Idioma`,languageAuto:`Automático`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`Dominios personalizados`,customDomainsHint:`Introduce un dominio o URL`,add:`Añadir`,invalidDomain:`Dominio o URL no válido`,save:`Guardar`,settingsSaved:`Guardado`},fr:{extensionDescription:`Revenez des fichiers raw aux pages de leur dépôt.`,bannerAriaLabel:`Navigation du dépôt RawBack`,openRepositoryFileAriaLabel:`Voir ce fichier dans le dépôt`,openInRepository:`Voir dans le dépôt`,dismissThisFile:`Masquer ce fichier`,hiddenFiles:`Fichiers masqués`,hiddenFilesEmpty:`Aucun fichier masqué.`,restore:`Restaurer`,restored:`Restauré`,enabled:`Activé`,disabled:`Désactivé`,currentPage:`Page actuelle`,rawPage:`Fichier raw détecté`,notRawPage:`Cette page n'est pas un fichier raw.`,openRepository:`Ouvrir le dépôt`,appearance:`Apparence`,theme:`Thème`,themeSystem:`Système`,themeLight:`Clair`,themeDark:`Sombre`,platforms:`Plateformes`,language:`Langue`,languageAuto:`Auto`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`Domaines personnalisés`,customDomainsHint:`Entrez un domaine ou une URL`,add:`Ajouter`,invalidDomain:`Domaine ou URL invalide`,save:`Enregistrer`,settingsSaved:`Enregistré`},de:{extensionDescription:`Springen Sie von Raw-Dateien zurück zu ihren Repository-Seiten.`,bannerAriaLabel:`RawBack-Repository-Navigation`,openRepositoryFileAriaLabel:`Diese Datei im Repository anzeigen`,openInRepository:`Im Repository anzeigen`,dismissThisFile:`Diese Datei ausblenden`,hiddenFiles:`Ausgeblendete Dateien`,hiddenFilesEmpty:`Keine ausgeblendeten Dateien.`,restore:`Wiederherstellen`,restored:`Wiederhergestellt`,enabled:`Aktiviert`,disabled:`Deaktiviert`,currentPage:`Aktuelle Seite`,rawPage:`Raw-Datei erkannt`,notRawPage:`Diese Seite ist keine Raw-Datei.`,openRepository:`Repository öffnen`,appearance:`Erscheinungsbild`,theme:`Design`,themeSystem:`System`,themeLight:`Hell`,themeDark:`Dunkel`,platforms:`Plattformen`,language:`Sprache`,languageAuto:`Auto`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`Benutzerdefinierte Domains`,customDomainsHint:`Domain oder URL eingeben`,add:`Hinzufügen`,invalidDomain:`Ungültige Domain oder URL`,save:`Speichern`,settingsSaved:`Gespeichert`},ru:{extensionDescription:`Возврат от raw-файлов к страницам их репозитория.`,bannerAriaLabel:`Навигация по репозиторию RawBack`,openRepositoryFileAriaLabel:`Посмотреть этот файл в репозитории`,openInRepository:`Посмотреть в репозитории`,dismissThisFile:`Скрыть этот файл`,hiddenFiles:`Скрытые файлы`,hiddenFilesEmpty:`Нет скрытых файлов.`,restore:`Восстановить`,restored:`Восстановлено`,enabled:`Включено`,disabled:`Отключено`,currentPage:`Текущая страница`,rawPage:`Обнаружен raw-файл`,notRawPage:`Эта страница не является raw-файлом.`,openRepository:`Открыть репозиторий`,appearance:`Внешний вид`,theme:`Тема`,themeSystem:`Системная`,themeLight:`Светлая`,themeDark:`Темная`,platforms:`Платформы`,language:`Язык`,languageAuto:`Авто`,languageEnglish:`English`,languageChinese:`中文`,languageJapanese:`日本語`,languageKorean:`한국어`,languageSpanish:`Español`,languageFrench:`Français`,languageGerman:`Deutsch`,languageRussian:`Русский`,customDomains:`Свои домены`,customDomainsHint:`Введите домен или URL`,add:`Добавить`,invalidDomain:`Недопустимый домен или URL`,save:`Сохранить`,settingsSaved:`Сохранено`}};function w(e,t=`auto`){return t===`auto`?p.i18n.getMessage(e)||C.en[e]:C[t][e]}var T=`
#rawback-banner-host {
  all: initial;
  color-scheme: light dark;
  display: block;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  height: 48px;
  -webkit-user-select: none;
  user-select: none;
}



.rawback-banner,
.rawback-banner * {
  -webkit-user-select: none;
  user-select: none;
}

.rawback-banner {
  align-items: center;
  backdrop-filter: saturate(180%) blur(14px);
  background: var(--rawback-bg);
  border-bottom: 1px solid var(--rawback-border);
  box-sizing: border-box;
  color: var(--rawback-fg);
  display: grid;
  gap: 12px;
  grid-template-columns: auto minmax(0, 1fr) auto;
  left: 0;
  min-height: 48px;
  opacity: 0;
  padding: 7px 24px;
  position: fixed;
  right: 0;
  box-shadow: 0 1px 2px var(--rawback-shadow);
  top: 0;
  transform: translateY(-4px);
  transition: opacity 160ms ease, transform 160ms ease;
  width: 100vw;
  z-index: 2147483647;
}

#rawback-banner-host[data-mounted="true"] .rawback-banner {
  opacity: 1;
  transform: translateY(0);
}

#rawback-banner-host[data-theme="light"] {
  --rawback-bg: rgba(255, 255, 255, 0.92);
  --rawback-fg: #1f2328;
  --rawback-muted: #57606a;
  --rawback-border: rgba(208, 215, 222, 0.85);
  --rawback-button-bg: #1f6feb;
  --rawback-button-fg: #ffffff;
  --rawback-button-hover: #1158c7;
  --rawback-mark-bg: #f6f8fa;
  --rawback-mark-border: #d0d7de;
  --rawback-menu-bg: #ffffff;
  --rawback-menu-hover: #f6f8fa;
  --rawback-menu-shadow: rgba(31, 35, 40, 0.14);
  --rawback-shadow: rgba(31, 35, 40, 0.08);
  --rawback-accent: #2da44e;
  --rawback-danger-fg: #cf222e;
}

#rawback-banner-host[data-theme="dark"] {
  --rawback-bg: rgba(13, 17, 23, 0.9);
  --rawback-fg: #e6edf3;
  --rawback-muted: #8b949e;
  --rawback-border: rgba(48, 54, 61, 0.88);
  --rawback-button-bg: #238636;
  --rawback-button-fg: #ffffff;
  --rawback-button-hover: #2ea043;
  --rawback-mark-bg: #161b22;
  --rawback-mark-border: #30363d;
  --rawback-menu-bg: #161b22;
  --rawback-menu-hover: #21262d;
  --rawback-menu-shadow: rgba(1, 4, 9, 0.4);
  --rawback-shadow: rgba(1, 4, 9, 0.32);
  --rawback-accent: #3fb950;
  --rawback-danger-fg: #ff7b72;
}

.rawback-mark {
  align-items: center;
  background: var(--rawback-mark-bg);
  border: 1px solid var(--rawback-mark-border);
  border-radius: 999px;
  box-sizing: border-box;
  color: var(--rawback-fg);
  display: inline-flex;
  gap: 6px;
  font-size: 11px;
  font-weight: 700;
  height: 26px;
  justify-content: center;
  letter-spacing: 0;
  padding: 0 8px;
}

.rawback-mark-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.rawback-mark-icon-wrapper svg {
  display: block;
}

.rawback-meta {
  min-width: 0;
}

.rawback-title {
  color: var(--rawback-fg);
  display: block;
  font-size: 12px;
  font-weight: 700;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rawback-path {
  color: var(--rawback-muted);
  display: block;
  font-size: 11px;
  line-height: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rawback-button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  box-sizing: border-box;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
}

.rawback-open-actions {
  align-items: center;
  display: inline-flex;
}

.rawback-button {
  background: var(--rawback-button-bg);
  border-radius: 6px;
  color: var(--rawback-button-fg);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  min-height: 32px;
  padding: 0 12px;
  text-decoration: none;
  white-space: nowrap;
}

.rawback-button:hover {
  background: var(--rawback-button-hover);
}

.rawback-button:focus-visible {
  outline: 3px solid #60a5fa;
  outline-offset: 2px;
}

.rawback-actions {
  align-items: center;
  display: flex;
  gap: 6px;
}



@media (max-width: 520px) {
  #rawback-banner-host {
    height: 50px;
  }

  .rawback-banner {
    gap: 9px;
    min-height: 50px;
    padding: 7px 8px;
  }

  .rawback-mark {
    padding-inline: 7px;
  }

  .rawback-button {
    max-width: 42vw;
    overflow: hidden;
    padding: 0 10px;
    text-overflow: ellipsis;
  }
}
`;function E(e,t){return{platformInitials:k(e.platform),platformLabel:O(e.platform),repositoryLabel:`${e.user} / ${e.repo}`,filePath:e.filePath,primaryActionLabel:w(`openInRepository`,t),primaryActionAriaLabel:w(`openRepositoryFileAriaLabel`,t),primaryActionUrl:e.fileUrl,repositoryOrigin:D(e.fileUrl)}}function D(e){try{return new URL(e).origin}catch{return``}}function O(e){return e===`github`?`GitHub`:e===`gitlab`?`GitLab`:e===`gitea`?`Gitea`:``}function k(e){return e===`github`?`GH`:e===`gitlab`?`GL`:e===`gitea`?`GT`:``}function A(e,t){let n=t===`dark`;return e===`github`?`<svg viewBox="0 0 16 16" width="14" height="14" fill="${n?`#E6EDF3`:`#1F2328`}" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>`:e===`gitlab`?`<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" style="margin-top: 4px;"><path fill="#E24329" d="M15.82 5.922 13.57.172a.548.548 0 0 0-1.024 0L10.74 4.802H5.26L3.456.17a.548.548 0 0 0-1.024 0L.182 5.922c-.173.44.025.932.44 1.114l7.38 5.753 7.378-5.75c.415-.183.614-.675.44-1.116Z"/><path fill="#FC6D26" d="M10.74 4.802 8 13.256l7.378-6.22-4.638-2.234Z"/><path fill="#FCA326" d="M8 13.256 10.74 4.802h4.639L8 13.256Z"/><path fill="#FC6D26" d="M5.26 4.802 8 13.256.622 7.036 5.26 4.802Z"/><path fill="#FCA326" d="M8 13.256 5.26 4.802H.621L8 13.256Z"/></svg>`:e===`gitea`?`<svg viewBox="0 0 24 24" width="14" height="14" fill="${n?`#84D637`:`#609926`}" aria-hidden="true"><path d="M4.209 4.603c-.247 0-.525.02-.84.088-.333.07-1.28.283-2.054 1.027C-.403 7.25.035 9.685.089 10.052c.065.446.263 1.687 1.21 2.768 1.749 2.141 5.513 2.092 5.513 2.092s.462 1.103 1.168 2.119c.955 1.263 1.936 2.248 2.89 2.367 2.406 0 7.212-.004 7.212-.004s.458.004 1.08-.394c.535-.324 1.013-.893 1.013-.893s.492-.527 1.18-1.73c.21-.37.385-.729.538-1.068 0 0 2.107-4.471 2.107-8.823-.042-1.318-.367-1.55-.443-1.627-.156-.156-.366-.153-.366-.153s-4.475.252-6.792.306c-.508.011-1.012.023-1.512.027v4.474l-.634-.301c0-1.39-.004-4.17-.004-4.17-1.107.016-3.405-.084-3.405-.084s-5.399-.27-5.987-.324c-.187-.011-.401-.032-.648-.032zm.354 1.832h.111s.271 2.269.6 3.597C5.549 11.147 6.22 13 6.22 13s-.996-.119-1.641-.348c-.99-.324-1.409-.714-1.409-.714s-.73-.511-1.096-1.52C1.444 8.73 2.021 7.7 2.021 7.7s.32-.859 1.47-1.145c.395-.106.863-.12 1.072-.12zm8.33 2.554c.26.003.509.127.509.127l.868.422-.529 1.075a.686.686 0 0 0-.614.359.685.685 0 0 0 .072.756l-.939 1.924a.69.69 0 0 0-.66.527.687.687 0 0 0 .347.763.686.686 0 0 0 .867-.206.688.688 0 0 0-.069-.882l.916-1.874a.667.667 0 0 0 .237-.02.657.657 0 0 0 .271-.137 8.826 8.826 0 0 1 1.016.512.761.761 0 0 1 .286.282c.073.21-.073.569-.073.569-.087.29-.702 1.55-.702 1.55a.692.692 0 0 0-.676.477.681.681 0 1 0 1.157-.252c.073-.141.141-.282.214-.431.19-.397.515-1.16.515-1.16.035-.066.218-.394.103-.814-.095-.435-.48-.638-.48-.638-.467-.301-1.116-.58-1.116-.58s0-.156-.042-.27a.688.688 0 0 0-.148-.241l.516-1.062 2.89 1.401s.48.218.583.619c.073.282-.019.534-.069.657-.24.587-2.1 4.317-2.1 4.317s-.232.554-.748.588a1.065 1.065 0 0 1-.393-.045l-.202-.08-4.31-2.1s-.417-.218-.49-.596c-.083-.31.104-.691.104-.691l2.073-4.272s.183-.37.466-.497a.855.855 0 0 1 .35-.077z"/></svg>`:``}function j(e){return e===`github`?`<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>`:e===`gitlab`?`<svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" style="margin-top: 4px;"><path fill="currentColor" d="M15.82 5.922 13.57.172a.548.548 0 0 0-1.024 0L10.74 4.802H5.26L3.456.17a.548.548 0 0 0-1.024 0L.182 5.922c-.173.44.025.932.44 1.114l7.38 5.753 7.378-5.75c.415-.183.614-.675.44-1.116Z"/><path fill="currentColor" d="M10.74 4.802 8 13.256l7.378-6.22-4.638-2.234Z"/><path fill="currentColor" d="M8 13.256 10.74 4.802h4.639L8 13.256Z"/><path fill="currentColor" d="M5.26 4.802 8 13.256.622 7.036 5.26 4.802Z"/><path fill="currentColor" d="M8 13.256 5.26 4.802H.621L8 13.256Z"/></svg>`:e===`gitea`?`<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M4.209 4.603c-.247 0-.525.02-.84.088-.333.07-1.28.283-2.054 1.027C-.403 7.25.035 9.685.089 10.052c.065.446.263 1.687 1.21 2.768 1.749 2.141 5.513 2.092 5.513 2.092s.462 1.103 1.168 2.119c.955 1.263 1.936 2.248 2.89 2.367 2.406 0 7.212-.004 7.212-.004s.458.004 1.08-.394c.535-.324 1.013-.893 1.013-.893s.492-.527 1.18-1.73c.21-.37.385-.729.538-1.068 0 0 2.107-4.471 2.107-8.823-.042-1.318-.367-1.55-.443-1.627-.156-.156-.366-.153-.366-.153s-4.475.252-6.792.306c-.508.011-1.012.023-1.512.027v4.474l-.634-.301c0-1.39-.004-4.17-.004-4.17-1.107.016-3.405-.084-3.405-.084s-5.399-.27-5.987-.324c-.187-.011-.401-.032-.648-.032zm.354 1.832h.111s.271 2.269.6 3.597C5.549 11.147 6.22 13 6.22 13s-.996-.119-1.641-.348c-.99-.324-1.409-.714-1.409-.714s-.73-.511-1.096-1.52C1.444 8.73 2.021 7.7 2.021 7.7s.32-.859 1.47-1.145c.395-.106.863-.12 1.072-.12zm8.33 2.554c.26.003.509.127.509.127l.868.422-.529 1.075a.686.686 0 0 0-.614.359.685.685 0 0 0 .072.756l-.939 1.924a.69.69 0 0 0-.66.527.687.687 0 0 0 .347.763.686.686 0 0 0 .867-.206.688.688 0 0 0-.069-.882l.916-1.874a.667.667 0 0 0 .237-.02.657.657 0 0 0 .271-.137 8.826 8.826 0 0 1 1.016.512.761.761 0 0 1 .286.282c.073.21-.073.569-.073.569-.087.29-.702 1.55-.702 1.55a.692.692 0 0 0-.676.477.681.681 0 1 0 1.157-.252c.073-.141.141-.282.214-.431.19-.397.515-1.16.515-1.16.035-.066.218-.394.103-.814-.095-.435-.48-.638-.48-.638-.467-.301-1.116-.58-1.116-.58s0-.156-.042-.27a.688.688 0 0 0-.148-.241l.516-1.062 2.89 1.401s.48.218.583.619c.073.282-.019.534-.069.657-.24.587-2.1 4.317-2.1 4.317s-.232.554-.748.588a1.065 1.065 0 0 1-.393-.045l-.202-.08-4.31-2.1s-.417-.218-.49-.596c-.083-.31.104-.691.104-.691l2.073-4.272s.183-.37.466-.497a.855.855 0 0 1 .35-.077z"/></svg>`:``}var M=`rawback-banner-host`;function N(e,t){P();let n=document.createElement(`div`);n.id=M,n.dataset.theme=F(t.theme);let r=document.createElement(`style`);r.textContent=T;let i=document.createElement(`div`),a=t=>{let n=E(e,t.language);i.className=`rawback-banner`,i.setAttribute(`role`,`region`),i.setAttribute(`aria-label`,w(`bannerAriaLabel`,t.language));let r=F(t.theme),a=A(e.platform,r),o=j(e.platform);i.innerHTML=`
      <div class="rawback-mark" aria-hidden="true">
        <span class="rawback-mark-icon-wrapper">${a}</span>
        <span class="rawback-mark-fallback" style="display:none;">${I(n.platformInitials)}</span>
      </div>
      <div class="rawback-meta">
        <span class="rawback-title">${I(n.repositoryLabel)}</span>
        <span class="rawback-path">${I(n.filePath)}</span>
      </div>
      <div class="rawback-actions">
        <div class="rawback-open-actions">
          <a class="rawback-button primary" href="${L(n.primaryActionUrl)}" aria-label="${L(n.primaryActionAriaLabel)}">
            ${o}
            ${I(n.primaryActionLabel)}
          </a>
        </div>
      </div>
    `};return a(t),n.dataset.mounted=`true`,n.append(r,i),document.body.prepend(n),{remove:()=>{n.remove()},update:e=>{n.dataset.theme=F(e.theme),a(e)}}}function P(){document.getElementById(M)?.remove()}function F(e){return e===`light`||e===`dark`?e:matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`}function I(e){return e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function L(e){return I(e)}var R=e({matches:[`<all_urls>`],runAt:`document_start`,async main(){let e=null,t=null,n=null,r=async r=>{let a=r??await g(),o=i(location.href,{disabledPlatforms:a.disabledPlatforms,selfHostedGitlabHosts:a.selfHostedGitlabHosts,selfHostedGiteaHosts:a.selfHostedGiteaHosts}),s=!a.enabled||a.disabledHosts.includes(location.hostname)||!o||a.dismissedFiles.includes(o.fileUrl),c=B(a,o);if(document.documentElement.dataset.rawbackLoaded=`true`,document.documentElement.dataset.rawbackReason=c,window.__RAWBACK_DEBUG__={loaded:!0,url:location.href,parsed:o,settings:a,blocked:s,reason:c},s){e?.remove(),e=null,t=null,n=null,P();return}if(e&&t===o.fileUrl&&n===a.language){e.update(a);return}await z(),e?.remove(),e=N(o,a),t=o.fileUrl,n=a.language};await r(),_(e=>void r(e))}});function z(){return document.body?Promise.resolve():new Promise(e=>{let t=new MutationObserver(()=>{document.body&&(t.disconnect(),e())});t.observe(document.documentElement,{childList:!0})})}function B(e,t){return e.enabled?e.disabledHosts.includes(location.hostname)?`disabled-host`:t?e.dismissedFiles.includes(t.fileUrl)?`dismissed-file`:`visible`:`not-raw-url`:`disabled`}var V={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},H=class e extends Event{static EVENT_NAME=U(`wxt:locationchange`);constructor(t,n){super(e.EVENT_NAME,{}),this.newUrl=t,this.oldUrl=n}};function U(e){return`${p?.runtime?.id}:content:${e}`}var W=typeof globalThis.navigation?.addEventListener==`function`;function G(e){let t,n=!1;return{run(){n||(n=!0,t=new URL(location.href),W?globalThis.navigation.addEventListener(`navigate`,e=>{let n=new URL(e.destination.url);n.href!==t.href&&(window.dispatchEvent(new H(n,t)),t=n)},{signal:e.signal}):e.setInterval(()=>{let e=new URL(location.href);e.href!==t.href&&(window.dispatchEvent(new H(e,t)),t=e)},1e3))}}}var K=class e{static SCRIPT_STARTED_MESSAGE_TYPE=U(`wxt:content-script-started`);id;abortController;locationWatcher=G(this);constructor(e,t){this.contentScriptName=e,this.options=t,this.id=Math.random().toString(36).slice(2),this.abortController=new AbortController,this.stopOldScripts(),this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return p.runtime?.id??this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener(`abort`,e),()=>this.signal.removeEventListener(`abort`,e)}block(){return new Promise(()=>{})}setInterval(e,t){let n=setInterval(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearInterval(n)),n}setTimeout(e,t){let n=setTimeout(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearTimeout(n)),n}requestAnimationFrame(e){let t=requestAnimationFrame((...t)=>{this.isValid&&e(...t)});return this.onInvalidated(()=>cancelAnimationFrame(t)),t}requestIdleCallback(e,t){let n=requestIdleCallback((...t)=>{this.signal.aborted||e(...t)},t);return this.onInvalidated(()=>cancelIdleCallback(n)),n}addEventListener(e,t,n,r){t===`wxt:locationchange`&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(t.startsWith(`wxt:`)?U(t):t,n,{...r,signal:this.signal})}notifyInvalidated(){this.abort(`Content script context invalidated`),V.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){document.dispatchEvent(new CustomEvent(e.SCRIPT_STARTED_MESSAGE_TYPE,{detail:{contentScriptName:this.contentScriptName,messageId:this.id}})),this.options?.noScriptStartedPostMessage||window.postMessage({type:e.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:this.id},`*`)}verifyScriptStartedEvent(e){let t=e.detail?.contentScriptName===this.contentScriptName,n=e.detail?.messageId===this.id;return t&&!n}listenForNewerScripts(){let t=e=>{!(e instanceof CustomEvent)||!this.verifyScriptStartedEvent(e)||this.notifyInvalidated()};document.addEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t),this.onInvalidated(()=>document.removeEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t))}},q={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(async()=>{try{let{main:e,...t}=R;return await e(new K(`content`,t))}catch(e){throw q.error(`The content script "content" crashed on startup!`,e),e}})()})();
content;