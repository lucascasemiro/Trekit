document.addEventListener('DOMContentLoaded', function() {
    const imageUpload = document.getElementById('imageUpload');
    const mainImageContainer = document.getElementById('mainImageContainer');
    const uploadPlaceholder = document.getElementById('uploadPlaceholder');
    const additionalImagesContainer = document.getElementById('additionalImagesContainer');
    const additionalImages = document.getElementById('additionalImages');
    const addMoreImagesBtn = document.getElementById('addMoreImagesBtn');
    const form = document.getElementById('trilhaForm');
    const locationInput = document.getElementById('trilhaLocation');
    const mapView = document.getElementById('mapView');
    const mapPlaceholder = document.getElementById('mapPlaceholder');

    let mainImage = null;
    let additionalImagesList = [];

    function updateMainImagePreview() {
        // Limpa container antes
        mainImageContainer.querySelectorAll('.image-wrapper, .btn-remove-main-image').forEach(el => el.remove());

        if (mainImage) {
            const wrapper = document.createElement('div');
            wrapper.className = 'image-wrapper';

            const img = document.createElement('img');
            img.src = mainImage.dataUrl;
            wrapper.appendChild(img);

            mainImageContainer.appendChild(wrapper);

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'btn-remove-main-image';
            removeBtn.innerHTML = '<i class="bi bi-x-circle"></i> Remover';
            removeBtn.onclick = removeMainImage;
            mainImageContainer.appendChild(removeBtn);

            uploadPlaceholder.style.display = 'none';
            addMoreImagesBtn.classList.remove('d-none');
        } else {
            uploadPlaceholder.style.display = 'block';
            addMoreImagesBtn.classList.add('d-none');
        }
    }

    function handleMainImage(file) {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            if (mainImage) {
                additionalImagesList.unshift(mainImage);
            }
            mainImage = { file, dataUrl: e.target.result };
            updateMainImagePreview();
            updateAdditionalImagesPreview();
        };
        reader.readAsDataURL(file);
    }

    function removeMainImage() {
        if (additionalImagesList.length > 0) {
            mainImage = additionalImagesList.shift();
        } else {
            mainImage = null;
        }
        updateMainImagePreview();
        updateAdditionalImagesPreview();
    }

    imageUpload.addEventListener('change', function() {
        if (this.files.length) handleMainImage(this.files[0]);
    });

    addMoreImagesBtn.addEventListener('click', function() {
        const tempInput = document.createElement('input');
        tempInput.type = 'file';
        tempInput.accept = 'image/*';
        tempInput.multiple = true;
        tempInput.onchange = function() {
            Array.from(this.files).forEach(file => {
                if (!file.type.startsWith('image/')) return;
                const reader = new FileReader();
                reader.onload = function(e) {
                    additionalImagesList.push({ file, dataUrl: e.target.result });
                    updateAdditionalImagesPreview();
                };
                reader.readAsDataURL(file);
            });
        };
        tempInput.click();
    });

    function updateAdditionalImagesPreview() {
        additionalImages.innerHTML = '';
        if (additionalImagesList.length > 0) {
            additionalImagesContainer.classList.remove('d-none');
            additionalImagesList.forEach((imgObj, index) => {
                const item = document.createElement('div');
                item.className = 'additional-image-item position-relative';

                const img = document.createElement('img');
                img.src = imgObj.dataUrl;
                item.appendChild(img);

                const removeBtn = document.createElement('button');
                removeBtn.type = 'button';
                removeBtn.className = 'btn btn-danger btn-sm position-absolute top-0 end-0 m-1';
                removeBtn.innerHTML = '<i class="bi bi-x"></i>';
                removeBtn.style.width = '24px';
                removeBtn.style.height = '24px';
                removeBtn.style.padding = '0';
                removeBtn.style.borderRadius = '50%';
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    additionalImagesList.splice(index, 1);
                    updateAdditionalImagesPreview();
                };
                item.appendChild(removeBtn);

                additionalImages.appendChild(item);
            });
        } else {
            additionalImagesContainer.classList.add('d-none');
        }
    }

    // Mapa
    let debounceTimer;
    locationInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => updateMap(this.value), 800);
    });

    function updateMap(url) {
        if (!url) {
            resetMap();
            return;
        }
        if (!isValidGoogleMapsUrl(url)) {
            mapPlaceholder.innerHTML = '<i class="bi bi-exclamation-triangle"></i><p>URL inválida</p>';
            mapPlaceholder.classList.remove('d-none');
            mapView.classList.add('d-none');
            locationInput.classList.add('is-invalid');
            return;
        }
        locationInput.classList.remove('is-invalid');
        mapPlaceholder.classList.add('d-none');
        mapView.classList.remove('d-none');
        let embedUrl = url.includes('output=embed') ? url : url + (url.includes('?') ? '&' : '?') + 'output=embed';
        mapView.src = embedUrl;
    }

    function resetMap() {
        mapView.src = '';
        mapView.classList.add('d-none');
        mapPlaceholder.classList.remove('d-none');
        mapPlaceholder.innerHTML = '<i class="bi bi-map"></i><p>Visualização do mapa aparecerá aqui</p>';
    }

    function isValidGoogleMapsUrl(url) {
        return /https?:\/\/(www\.)?google\.[a-z]+\/maps/.test(url) || /https?:\/\/goo\.gl\/maps/.test(url);
    }

    // Formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!mainImage) {
            alert('Adicione pelo menos uma imagem da trilha.');
            return;
        }

        const requiredFields = form.querySelectorAll('[required]');
        let valid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                valid = false;
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });
        if (!valid) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        console.log('Imagem principal:', mainImage);
        console.log('Imagens adicionais:', additionalImagesList);
        alert('Trilha publicada com sucesso!');

        form.reset();
        mainImage = null;
        additionalImagesList = [];
        updateMainImagePreview();
        updateAdditionalImagesPreview();
        resetMap();
    });

    // Remove validação quando digitar
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) this.classList.remove('is-invalid');
        });
    });
});
