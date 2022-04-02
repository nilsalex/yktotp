window.onload = () => document.getElementById('totpKey').focus();

let state = {
    selectedAccount: "",
    returnedKey: "",
    availableAccounts: {},
    error: undefined,
}

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
    state = {
        ...state,
        ...newState,
    }
    render();
}

const render = () => {
    if (state.error) {
        document.getElementById('error').innerText = JSON.stringify(state)
        return
    }
    displayCode(state.returnedKey)
    displayListOfAccounts(state.availableAccounts)
}


const displayCode = (selectedKey) => {
    const node = document.getElementById('code');
    node.innerText = selectedKey;

    const selection = window.getSelection();
    const range = document.createRange();

    selection.removeAllRanges();
    range.selectNodeContents(node);
    selection.addRange(range);
};

const displayListOfAccounts = (accounts, selectedAccount) => {
    const node = document.getElementById('accounts');

    node.replaceChildren(
        ...Object.keys(accounts).map(account => {
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

chrome.runtime.sendMessage({ type: "getList" }, handleAccountsResponse);
