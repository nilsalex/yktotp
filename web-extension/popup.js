window.onload = () => document.getElementById('totpKey').focus();

let globalState = {
    selectedAccount: "",
    returnedKey: "",
    availableAccounts: {},
    error: undefined,
    filterEntered: ""
}

let oldState = {}

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

const setState = (newState) => {
    oldState = globalState;
    globalState = {
        ...globalState,
        ...newState,
    }
    render(globalState);
    componentsDidUpdate(oldState, globalState);
}

const componentsDidUpdate = (oldState, newState) => {
    if (oldState.returnedKey !== newState.returnedKey) {
        const selection = window.getSelection();
        const range = document.createRange();

        selection.removeAllRanges();
        range.selectNodeContents(document.getElementById('code'));
        selection.addRange(range);
    }
}

const render = (state) => {
    displayError(state.error);
    displayCode(state.returnedKey)
    displayListOfAccounts(state.availableAccounts, state.filterEntered)
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
    if (oldState.returnedKey !== selectedKey) {
        document.getElementById('code').innerText = selectedKey;
    }
};

const displayListOfAccounts = (accounts, filterEntered, selectedAccount) => {
    const node = document.getElementById('accounts');

    node.replaceChildren(
        ...Object.keys(accounts)
            .filter(account => account.toLowerCase().includes(filterEntered.toLowerCase()))
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
