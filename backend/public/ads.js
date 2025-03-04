(function () {
    const script = document.currentScript;
    const adContainer = document.createElement("div");
    adContainer.style.width = "500px";
    adContainer.style.height = "250px";
    adContainer.style.border = "1px solid #ccc";
    adContainer.style.textAlign = "center";
    adContainer.style.margin = "10px auto";
    adContainer.innerHTML = "Loading Ad...";

    document.body.appendChild(adContainer);

    // Backend se ad fetch karna
    fetch("https://desiads.onrender.com/api/ads/random")
        .then(response => response.json())
        .then(ad => {
            console.log(ad)
            adContainer.innerHTML = `<a href="${ad.targetUrl}" target="_blank">
                <img src="${ad.imageUrl}" style="width:100%; height:100%;" />
                
            </a>`;

            
            adContainer.querySelector("a").addEventListener("click", () => {
                fetch(`https://desiads.onrender.com/api/ads/click/${ad._id}`, { method: "POST" });
            });
        })
        .catch(err => {
            adContainer.innerHTML = "Ad failed to load.";
        });
})();