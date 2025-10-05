        document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const platformNameInput = document.getElementById('platformName');
            const buttonUrlInput = document.getElementById('buttonUrl');
            const downloadUrlInput = document.getElementById('downloadUrl');
            const addButton = document.getElementById('addButton');
            const buttonsList = document.getElementById('buttonsList');
            const generateLinkBtn = document.getElementById('generateLink');
            const finalLinkInput = document.getElementById('finalLink');
            const copyLinkBtn = document.getElementById('copyLink');
            const previewButtons = document.getElementById('previewButtons');
            const previewProgress = document.getElementById('previewProgress');
            const progressPercent = document.getElementById('progressPercent');
            const downloadMessage = document.getElementById('downloadMessage');
            const particlesContainer = document.getElementById('particles');
            const iconOptions = document.querySelectorAll('.icon-option');
            const generatorInterface = document.getElementById('generatorInterface');
            const finalPage = document.getElementById('finalPage');
            const finalButtons = document.getElementById('finalButtons');
            const finalProgress = document.getElementById('finalProgress');
            const finalProgressPercent = document.getElementById('finalProgressPercent');
            const finalDownloadMessage = document.getElementById('finalDownloadMessage');
            
            // State
            let buttons = [];
            let selectedIcon = 'fab fa-telegram';
            let selectedPlatform = 'telegram';
            let completedButtons = 0;
            let finalCompletedButtons = 0;
            
            // Create floating particles
            function createParticles() {
                for (let i = 0; i < 15; i++) {
                    const particle = document.createElement('div');
                    particle.classList.add('particle');
                    
                    const size = Math.random() * 8 + 4;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                    
                    particle.style.left = `${Math.random() * 100}%`;
                    particle.style.animationDelay = `${Math.random() * 15}s`;
                    particle.style.animationDuration = `${15 + Math.random() * 10}s`;
                    
                    particlesContainer.appendChild(particle);
                }
            }
            
            createParticles();
            
            // Icon selection
            iconOptions.forEach(option => {
                option.addEventListener('click', function() {
                    iconOptions.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    selectedIcon = this.getAttribute('data-icon');
                    selectedPlatform = this.getAttribute('data-platform');
                    
                    // Auto-fill platform name based on selection
                    const platformNames = {
                        'telegram': 'Telegram',
                        'youtube': 'YouTube',
                        'instagram': 'Instagram',
                        'facebook': 'Facebook',
                        'twitter': 'Twitter',
                        'linkedin': 'LinkedIn',
                        'discord': 'Discord',
                        'tiktok': 'TikTok',
                        'whatsapp': 'WhatsApp',
                        'reddit': 'Reddit',
                        'pinterest': 'Pinterest',
                        'snapchat': 'Snapchat'
                    };
                    
                    platformNameInput.value = platformNames[selectedPlatform] || '';
                });
            });
            
            // Add button
            addButton.addEventListener('click', function() {
                const name = platformNameInput.value.trim();
                const url = buttonUrlInput.value.trim();
                
                if (!name || !url) {
                    alert('Please enter both platform name and URL');
                    return;
                }
                
                // Add button to list
                buttons.push({
                    name,
                    icon: selectedIcon,
                    platform: selectedPlatform,
                    url
                });
                
                // Update UI
                updateButtonsList();
                updatePreview();
                
                // Clear inputs
                platformNameInput.value = '';
                buttonUrlInput.value = '';
            });
            
            // Update buttons list
            function updateButtonsList() {
                buttonsList.innerHTML = '';
                
                buttons.forEach((button, index) => {
                    const buttonElement = document.createElement('div');
                    buttonElement.className = `social-button ${button.platform}`;
                    buttonElement.innerHTML = `
                        <i class="${button.icon}"></i>
                        <span>${button.name}</span>
                        <button class="btn btn-secondary" style="margin-left: auto; padding: 5px 10px;" onclick="removeButton(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    `;
                    buttonsList.appendChild(buttonElement);
                });
            }
            
            // Remove button
            window.removeButton = function(index) {
                buttons.splice(index, 1);
                updateButtonsList();
                updatePreview();
            };
            
            // Update preview
            function updatePreview() {
                previewButtons.innerHTML = '';
                completedButtons = 0;
                
                buttons.forEach((button, index) => {
                    const buttonElement = document.createElement('div');
                    buttonElement.className = `social-button ${button.platform}`;
                    buttonElement.innerHTML = `
                        <i class="${button.icon}"></i>
                        <span>Join ${button.name}</span>
                        <div class="checked">
                            <i class="fas fa-check"></i>
                        </div>
                    `;
                    
                    buttonElement.addEventListener('click', function() {
                        if (!this.classList.contains('completed')) {
                            this.classList.add('completed');
                            completedButtons++;
                            updateProgress();
                            
                            // Open URL in new tab
                            window.open(button.url, '_blank');
                        }
                    });
                    
                    previewButtons.appendChild(buttonElement);
                });
                
                // Add download button
                const downloadButton = document.createElement('div');
                downloadButton.className = 'social-button download disabled';
                downloadButton.id = 'previewDownloadBtn';
                downloadButton.innerHTML = `
                    <i class="fas fa-download"></i>
                    <span>Download File</span>
                `;
                
                downloadButton.addEventListener('click', function() {
                    if (!this.classList.contains('disabled')) {
                        downloadMessage.style.display = 'block';
                        
                        // Create a temporary download link
                        setTimeout(function() {
                            const link = document.createElement('a');
                            link.href = downloadUrlInput.value;
                            link.download = 'download';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }, 1000);
                    }
                });
                
                previewButtons.appendChild(downloadButton);
                updateProgress();
            }
            
            // Update progress
            function updateProgress() {
                const totalButtons = buttons.length;
                const progress = totalButtons > 0 ? (completedButtons / totalButtons) * 100 : 0;
                
                previewProgress.style.width = `${progress}%`;
                progressPercent.textContent = `${Math.round(progress)}%`;
                
                const downloadBtn = document.getElementById('previewDownloadBtn');
                if (downloadBtn) {
                    if (completedButtons === totalButtons && totalButtons > 0) {
                        downloadBtn.classList.remove('disabled');
                    } else {
                        downloadBtn.classList.add('disabled');
                    }
                }
            }
            
            // Generate final link
            generateLinkBtn.addEventListener('click', function() {
                if (buttons.length === 0) {
                    alert('Please add at least one social media button');
                    return;
                }
                
                if (!downloadUrlInput.value.trim()) {
                    alert('Please enter a download URL');
                    return;
                }
                
                // Create a data URL with the configuration
                const config = {
                    buttons: buttons,
                    downloadUrl: downloadUrlInput.value
                };
                
                const configString = JSON.stringify(config);
                const base64Config = btoa(configString);
                
                // Create the final URL (using URL parameters)
                const finalUrl = `${window.location.origin}${window.location.pathname}?config=${base64Config}`;
                finalLinkInput.value = finalUrl;
            });
            
            // Copy link
            copyLinkBtn.addEventListener('click', function() {
                if (!finalLinkInput.value) {
                    alert('Please generate a link first');
                    return;
                }
                
                finalLinkInput.select();
                document.execCommand('copy');
                
                // Visual feedback
                const originalText = copyLinkBtn.innerHTML;
                copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyLinkBtn.innerHTML = originalText;
                }, 2000);
            });
            
            // Check for URL parameters on load (for pre-configured pages)
            const urlParams = new URLSearchParams(window.location.search);
            const configParam = urlParams.get('config');
            
            if (configParam) {
                try {
                    const config = JSON.parse(atob(configParam));
                    
                    // Hide generator and show final page
                    generatorInterface.classList.add('hidden');
                    finalPage.classList.remove('hidden');
                    
                    // Load the configuration
                    loadFinalPage(config);
                } catch (e) {
                    console.error('Error parsing configuration from URL', e);
                }
            }
            
            // Load final page with configuration
            function loadFinalPage(config) {
                const buttons = config.buttons || [];
                const downloadUrl = config.downloadUrl || '';
                
                finalButtons.innerHTML = '';
                finalCompletedButtons = 0;
                
                // Add social media buttons
                buttons.forEach((button, index) => {
                    const buttonElement = document.createElement('div');
                    buttonElement.className = `social-button ${button.platform}`;
                    buttonElement.innerHTML = `
                        <i class="${button.icon}"></i>
                        <span>Join ${button.name}</span>
                        <div class="checked">
                            <i class="fas fa-check"></i>
                        </div>
                    `;
                    
                    buttonElement.addEventListener('click', function() {
                        if (!this.classList.contains('completed')) {
                            this.classList.add('completed');
                            finalCompletedButtons++;
                            updateFinalProgress();
                            
                            // Open URL in new tab
                            window.open(button.url, '_blank');
                        }
                    });
                    
                    finalButtons.appendChild(buttonElement);
                });
                
                // Add download button
                const downloadButton = document.createElement('div');
                downloadButton.className = 'social-button download disabled';
                downloadButton.id = 'finalDownloadBtn';
                downloadButton.innerHTML = `
                    <i class="fas fa-download"></i>
                    <span>Download File</span>
                `;
                
                downloadButton.addEventListener('click', function() {
                    if (!this.classList.contains('disabled')) {
                        finalDownloadMessage.style.display = 'block';
                        
                        // Create a temporary download link
                        setTimeout(function() {
                            const link = document.createElement('a');
                            link.href = downloadUrl;
                            link.download = 'download';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }, 1000);
                    }
                });
                
                finalButtons.appendChild(downloadButton);
                updateFinalProgress();
            }
            
            // Update final progress
            function updateFinalProgress() {
                const totalButtons = document.querySelectorAll('#finalButtons .social-button:not(.download)').length;
                const progress = totalButtons > 0 ? (finalCompletedButtons / totalButtons) * 100 : 0;
                
                finalProgress.style.width = `${progress}%`;
                finalProgressPercent.textContent = `${Math.round(progress)}%`;
                
                const downloadBtn = document.getElementById('finalDownloadBtn');
                if (downloadBtn) {
                    if (finalCompletedButtons === totalButtons && totalButtons > 0) {
                        downloadBtn.classList.remove('disabled');
                    } else {
                        downloadBtn.classList.add('disabled');
                    }
                }
            }
            
            // Initialize preview
            updatePreview();
        });
    