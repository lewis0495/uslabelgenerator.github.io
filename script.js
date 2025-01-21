document.addEventListener('DOMContentLoaded', () => {
    let googleSheetData = [];

    // Fetch data from Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbz1BA06D3__nJ6z9WGSiLU3e_WNgT0EzJb_Id21P7e6s2tXfOemuKMejB2Xk0o-7caGkg/exec')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            googleSheetData = data; // Assign fetched data to googleSheetData
            console.log('Fetched Google Sheet Data:', googleSheetData); // Debugging
        })
        .catch(error => console.error('Error fetching data:', error));

    // Handle dropdown changes
    document.getElementById('removedFrom').addEventListener('change', updateValues);
    document.getElementById('populateDataCheckbox').addEventListener('change', updateValues);

    // Update overlays on input
    document.querySelectorAll("input, select, .text-box").forEach(input => {
        input.addEventListener("input", updateText);
        input.addEventListener("change", updateText);
    });

    // Function to update overlay text
    function updateText(event) {
        const { id, value } = event.target;
        // Update the corresponding overlay text
        document.getElementById(`overlay${id.charAt(0).toUpperCase() + id.slice(1)}`).innerText = value;
    }

    // Function to update values based on selected dropdown and checkbox state
    function updateValues() {
        const selectedValue = document.getElementById('removedFrom').value;
        const isChecked = document.getElementById('populateDataCheckbox').checked;

        // Static mapping for "Removed From Serial"
        const serialMapping = {
            'G-PJCD': '31385',
            'G-PJCM': '41207',
            'G-PJCN': '41212',
            'G-PJCS': '41220',
        };

        // Dynamic mappings for "Total Hours" and "Total Cycles"
        const totalHoursMapping = {
            'G-PJCD': googleSheetData[0]?.[0] || '',
            'G-PJCM': googleSheetData[2]?.[0] || '',
            'G-PJCN': googleSheetData[4]?.[0] || '',
            'G-PJCS': googleSheetData[6]?.[0] || '',
        };

        const totalCyclesMapping = {
            'G-PJCD': googleSheetData[1]?.[0] || '',
            'G-PJCM': googleSheetData[3]?.[0] || '',
            'G-PJCN': googleSheetData[5]?.[0] || '',
            'G-PJCS': googleSheetData[7]?.[0] || '',
        };

        // Get the "Removed From Serial" value
        const serialNumber = serialMapping[selectedValue] || '';
        document.getElementById('removedFromSerial').value = serialNumber;
        document.getElementById('overlayRemovedFromSerial').innerText = serialNumber;

        if (isChecked) {
            // Get the "Total Hours" value
            const totalHours = totalHoursMapping[selectedValue] || '';
            document.getElementById('totalHours').value = totalHours;
            document.getElementById('overlayTotalHours').innerText = totalHours;

            // Get the "Total Cycles" value
            const totalCycles = totalCyclesMapping[selectedValue] || '';
            document.getElementById('totalCycles').value = totalCycles;
            document.getElementById('overlayTotalCycles').innerText = totalCycles;
        } else {
            // Clear the "Total Hours" and "Total Cycles" fields if the checkbox is unchecked
            document.getElementById('totalHours').value = '';
            document.getElementById('overlayTotalHours').innerText = '';
            document.getElementById('totalCycles').value = '';
            document.getElementById('overlayTotalCycles').innerText = '';
        }

        // Update "Removed From" input field and its overlay
        document.getElementById('removedfrominput').value = selectedValue;
        document.getElementById('overlayremovedfrominput').innerText = selectedValue;
    }

    // Initialize default values
    document.getElementById('authority').value = 'GAEL';
    document.getElementById('overlayAuthority').innerText = 'GAEL';

    const today = new Date().toLocaleDateString('en-GB').split('/').join('.');
    document.getElementById('date').value = today;
    document.getElementById('overlayDate').innerText = today;

    // Adjust positions of text boxes and apply custom font to 'Signed'
    document.querySelectorAll(".text-box").forEach(textBox => {
        switch (textBox.id) {
            case 'overlayDescription':
                textBox.style.top = '175px';
                textBox.style.left = '490px';
                textBox.style.width = '800px';
                break;
            case 'overlayQty':
                textBox.style.top = '173px';
                textBox.style.left = '1450px';
                textBox.style.width = '150px';
                break;
            case 'overlayPartNo':
                textBox.style.top = '255px';
                textBox.style.left = '300px';
                textBox.style.width = '825px';
                break;
            case 'overlaySerialNo':
                textBox.style.top = '266px';
                textBox.style.left = '1316px';
                textBox.style.width = '290px';
                textBox.style.fontSize = '36px';
                break;
            case 'overlayremovedfrominput':
                textBox.style.top = '335px';
                textBox.style.left = '440px';
                textBox.style.width = '700px';
                break;
            case 'overlayRemovedFromSerial':
                textBox.style.top = '335px';
                textBox.style.left = '1318px';
                textBox.style.width = '290px';
                break;
            case 'overlayWorkOrderNo':
                textBox.style.top = '425px';
                textBox.style.left = '442px';
                textBox.style.width = '320px';
                textBox.style.fontSize = '36px';
                break;
            case 'overlayTotalHours':
                textBox.style.top = '425px';
                textBox.style.left = '1026px';
                textBox.style.width = '200px';
                textBox.style.fontSize = '36px';
                break;
            case 'overlayTotalCycles':
                textBox.style.top = '425px';
                textBox.style.left = '1480px';
                textBox.style.width = '180px';
                textBox.style.fontSize = '36px';
                break;
            case 'overlayReasonForRemoval':
                textBox.style.top = '570px';
                textBox.style.left = '150px';
                textBox.style.width = '1400px';
                break;
            case 'overlayAuthority':
                textBox.style.top = '840px';
                textBox.style.left = '828px';
                textBox.style.width = '440px';
                break;
            case 'overlayDate':
                textBox.style.top = '840px';
                textBox.style.left = '1358px';
                textBox.style.width = '290px';
                break;
            case 'overlaySigned':
                textBox.style.top = '840px';
                textBox.style.left = '290px';
                textBox.style.fontFamily = 'Dancing Script, cursive'; // Applied the local font
                textBox.style.width = '350px';
                break;
        }
    });

    // Download image function
    function downloadImage() {
        const node = document.getElementById('formImage');
        const description = document.getElementById('description').value;

        const currentDate = new Date().toLocaleDateString('en-GB').split('/').join('.');
        const fileName = `US Label - ${description} - ${currentDate}.png`;

        domtoimage.toPng(node)
            .then(dataUrl => {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = fileName;
                link.click();
            })
            .catch(error => {
                console.error('Error capturing image:', error);
            });
    }

    window.downloadImage = downloadImage; // Make function accessible to button
});
