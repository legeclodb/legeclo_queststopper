const saveOptions = () => {
    let count = parseInt(document.getElementById('input-count').value);
    chrome.storage.local.set({count: count}, () => {
        alert('設定を更新しました');
    });
};

const restoreOptions= () => {
    chrome.storage.local.get('count', (data) => {
        document.getElementById('input-count').value = data.count || 10;
    });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('btn-save').addEventListener('click', saveOptions);