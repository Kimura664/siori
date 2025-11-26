// ローカルストレージを利用して来場者数を保存
(function () {
    const visitorKey = "visitorCount";
    const kiribanNumber = 100; // キリ番の設定
    const visitorCountElement = document.getElementById("visitorCount");
    const specialMessageElement = document.getElementById("specialMessage");

    // 来場者数を取得または初期化
    let visitorCount = parseInt(localStorage.getItem(visitorKey), 10) || 0;
    visitorCount++;

    // 更新した来場者数をローカルストレージに保存
    localStorage.setItem(visitorKey, visitorCount);

    // 来場者数を表示
    if (visitorCountElement) {
        visitorCountElement.textContent = `来場者数: ${visitorCount}`;
    }

    // キリ番のメッセージを更新
    if (specialMessageElement) {
        if (visitorCount % kiribanNumber === 0) {
            specialMessageElement.textContent = `おめでとうございます！キリ番 ${visitorCount} に達成しました！`;
        } else {
            const nextKiriban = kiribanNumber - (visitorCount % kiribanNumber);
            specialMessageElement.textContent = `次のキリ番まであと ${nextKiriban} 人です！`;
        }
    }
})();