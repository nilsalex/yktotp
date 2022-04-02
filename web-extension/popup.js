window.onload = () => document.getElementById('totpKey').focus();

let state = {
    selectedAccount: "",
    returnedKey: "",
    availableAccounts: {},
    error: undefined,
    filterEntered: "",
    debug: ""
}

let nextStateUpdate = undefined
let oldState = undefined

const handleCodeResponse = (response) => {
    if (response.error) {
        setState({ error: response.error });
    } else {
        setState({ error: undefined, returnedKey: response.code, selectedAccount: response.account });
    }
}
const handleAccountsResponse = (response) => {
    if (response.error) {
        setState({ error: response.error });
    } else {
        setState({
            error: undefined,
            availableAccounts: response.accounts.reduce((accounts, account) => ({
                ...accounts,
                [account]: account
            }), {})
        });
    }
}

const commitNewStateAndRender = (oldState, newState) => {
    debug("commit new state" +  JSON.stringify(newState));

    state = {
        ...state,
        ...newState,
    }
    render();
    componentsDidUpdate(oldState, state);
}

const setState = (newState) => {
    debug("new state:" + JSON.stringify(newState));
    if (nextStateUpdate === undefined) {
        oldState = state;
        setTimeout(() => {
            commitNewStateAndRender(oldState, nextStateUpdate);
            nextStateUpdate = undefined;
        }, 100);
    }
    nextStateUpdate = { ...nextStateUpdate, ...newState };
}

const debug = (message) => {
    state.debug = state.debug + "<br><br>" + message
    document.getElementById('debug').innerHTML = state.debug
}

const componentsDidUpdate = (oldState, newState) => {
    if (oldState.returnedKey !== newState.returnedKey) {
        const selection = window.getSelection();
        const range = document.createRange();

        selection.removeAllRanges();
        range.selectNodeContents(document.getElementById('code'));
        selection.addRange(range);
        debug("Copied to clipboard");
    }
}

const render = () => {
    displayError(state.error);
    displayCode(state.returnedKey)
    displayListOfAccounts(state.availableAccounts)
}

const displayError = (error) => {
    if (!error) {
        document.getElementById('error').innerText = '';
    } else if (error.includes("NoMatchingCredential")) {
        document.getElementById('error').innerText = "No matching credentials found.";
    } else {
        document.getElementById('error').innerText = error;
    }
}

const displayCode = (selectedKey) => {
    const node = document.getElementById('code');
    node.innerText = selectedKey;
    debug("rendered displayed key")
};

const displayListOfAccounts = (accounts, selectedAccount) => {
    const node = document.getElementById('accounts');

    node.replaceChildren(
        ...Object.keys(accounts)
            .filter(account => account.toLowerCase().includes(state.filterEntered.toLowerCase()))
            .sort()
            .map(account => {
                const li = document.createElement('li');
                li.innerText = accounts[account];
                return li;
            }));
};

document.getElementById('getTotp').addEventListener('submit', async (e) => {
    e.preventDefault();

    const key = e.target.elements.totpKey.value;

    document.getElementById('code').innerText = 'getting OTP ... (touch YubiKey?)';

    chrome.runtime.sendMessage({ type: "getOtp", key }, handleCodeResponse);
});

document.getElementById('getTotp').addEventListener('keyup', async (e) => {
    setState({ filterEntered: e.target.value });
});

chrome.runtime.sendMessage({ type: "getList" }, handleAccountsResponse);
