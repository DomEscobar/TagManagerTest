export function addGTMScripts(gtmId: string | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
        if (gtmId == undefined) {
            return;
        }

        const doc = browserGlobals.documentRef();
        pushOnDataLayer({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js',
        });

        const gtmScript: HTMLScriptElement = doc.createElement('script');
        gtmScript.id = 'GTMscript';
        gtmScript.setAttribute("data-cookieconsent", "ignore");
        gtmScript.async = true;
        gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + gtmId;
        gtmScript.addEventListener('load', () => {
            return resolve();
        });
        gtmScript.addEventListener('error', () => {
            console.error('failed to load gtm.js')
            return reject();
        });
        doc.head.insertBefore(gtmScript, doc.head.firstChild);
    });
}


export function addGAScript(gaTrackingId: string | undefined): void {

    if (gaTrackingId == undefined) {
        return;
    }

    const gTagManagerScript = document.createElement('script');
    gTagManagerScript.async = true;
    gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`;
    document.head.appendChild(gTagManagerScript);
    const gaScript = document.createElement('script');
    gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag() { 
          console.log(arguments);
          dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${gaTrackingId}');
      `;
    document.head.appendChild(gaScript);
}

export function getDataLayer(): any[] {
    const window = browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
}

export function pushOnDataLayer(obj: object): void {
    const dataLayer = getDataLayer();
    dataLayer.push(obj);
}

export const browserGlobals = {
    windowRef(): any {
        return window;
    },
    documentRef(): any {
        return document;
    },
};