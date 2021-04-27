export function addGTMScripts(gtmId: string | undefined): Promise<void> {
    return new Promise((resolve, reject) => {
        if (gtmId == undefined) {
            return;
        }

        const doc = browserGlobals.documentRef();
        pushOnDataLayer({
            'gtm.start': new Date().getTime(),
            'event': 'gtm.js'
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

function getDataLayer(): any[] {
    const window = browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [{
        'country': 'Germany'
    }];
    return window.dataLayer;
}

export function pushOnDataLayer(obj: object): void {
    const dataLayer = getDataLayer();
    console.log(obj);
    dataLayer.push(obj);
}

const browserGlobals = {
    windowRef(): any {
        return window;
    },
    documentRef(): any {
        return document;
    },
};
