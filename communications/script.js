document.addEventListener('DOMContentLoaded', function () {

  // Fetch version information
  fetch('version.json')
    .then(response => response.json())
    .then(data => {
      // Update version number in the UI
      document.getElementById('version-number').textContent = data.version;
      
      // Set up version modal functionality
      const versionLink = document.getElementById('version-link');
      const versionModal = document.getElementById('version-modal');
      const closeBtn = document.querySelector('.close');
      const changelogContent = document.getElementById('changelog-content');
      
      // Populate changelog content
      let changelogHTML = '';
      data.changelog.forEach(entry => {
        changelogHTML += `
          <div class="version-item">
            <div class="version-header">
              <span class="version-number">Version ${entry.version}</span>
              <span class="version-date">${entry.date}</span>
            </div>
            <ul class="version-changes">
              ${entry.changes.map(change => `<li>${change}</li>`).join('')}
            </ul>
          </div>
        `;
      });
      changelogContent.innerHTML = changelogHTML;
      
      // Open modal when version link is clicked
      versionLink.addEventListener('click', function(e) {
        e.preventDefault();
        versionModal.style.display = 'block';
      });
      
      // Close modal when X is clicked
      closeBtn.addEventListener('click', function() {
        versionModal.style.display = 'none';
      });
      
      // Close modal when clicking outside of it
      window.addEventListener('click', function(e) {
        if (e.target === versionModal) {
          versionModal.style.display = 'none';
        }
      });
    })
    .catch(error => console.error('Error loading version information:', error));
  // Initialize filters object
  let filters = {
    keyword: '',
    type: [],
    category: [],
    communication: [],
    topic: [],
  };

  // Get all view more buttons
  const viewMoreButtons = document.querySelectorAll('.view-more');

  // Add event listeners to communication checkboxes
  const communicationCheckboxes = document.querySelectorAll('input[name="communication"]');
  communicationCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      updateFilterArray('communication', this);
      displayCount = 6; // Reset display count when filter changes
      renderProducts();
    });
  });

  // Add event listeners to topic checkboxes
  const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
  topicCheckboxes.forEach(checkbox => {

    checkbox.addEventListener('change', function () {
      updateFilterArray('topic', this);
      displayCount = 6; // Reset display count when filter changes
      renderProducts();
    });
  });

  // Add click event listener to each view more button
  viewMoreButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the parent filter section
      const filterSection = this.closest('.filter-section');

      // Get all hidden options in this section
      const hiddenOptions = filterSection.querySelectorAll('.hidden-option');

      // Toggle the show class on hidden options
      hiddenOptions.forEach(option => {
        option.classList.toggle('show');
      });

      // Toggle active class on the button for rotation
      this.classList.toggle('active');

      // Update button text
      const isExpanded = this.classList.contains('active');
      this.innerHTML = isExpanded
        ? 'View Less <i class="fas fa-chevron-down"></i>'
        : 'View More <i class="fas fa-chevron-down"></i>';
    });
  });

  // Sample product data
  const products = [
    {
      id: 1,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'High-Efficiency Ceiling Fan',
      nameKey: 'high-efficiency-ceiling-fan',
      date: 'January 5th 2025',
      communicationName: 'in Issue #1',
      topic: 'Codes & Standards',
      topicKey: 'codes-standards',
      productCategory: 'Fans',
      categoryKey: 'fans',
      communicationType: 'insights',
      communicationTypeKey: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 2,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Adjustable Airflow Damper',
      nameKey: 'adjustable-airflow-damper',
      date: 'February 12th 2025',
      communicationName: 'in Issue #2',
      topics: ['Fan Energy Index', 'Air Distribution'],
      topicKey: 'fan-energy-index',
      productCategory: 'Dampers',
      categoryKey: 'dampers',
      communicationType: 'caps-update',
      communicationTypeKey: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 3,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Weather-Resistant Louver',
      nameKey: 'weather-resistant-louver',
      date: 'March 20th 2025',
      communicationName: 'in Issue #3',
      topic: 'Indoor Air Quality',
      topicKey: 'indoor-air-quality',
      productCategory: 'Louvers',
      categoryKey: 'louvers',
      communicationType: 'bulletin',
      communicationTypeKey: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 4,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Decorative Wall Grille',
      nameKey: 'decorative-wall-grille',
      date: 'April 15th 2025',
      communicationName: 'in Issue #4',
      topic: 'System Balancing',
      topicKey: 'system-balancing',
      productCategory: 'Grilles, Registers & Diffusers',
      categoryKey: 'grilles-registers-diffusers',
      communicationType: 'rep-update',
      communicationTypeKey: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 5,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Compact Air Terminal Unit',
      nameKey: 'compact-air-terminal-unit',
      date: 'May 10th 2025',
      communicationName: 'in Issue #5',
      topic: 'Energy Recovery',
      topicKey: 'energy-recovery',
      productCategory: 'Air Terminal Units',
      categoryKey: 'air-terminal-units',
      communicationType: 'insights',
      communicationTypeKey: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 6,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Modular Air Handling Unit',
      nameKey: 'modular-air-handling-unit',
      date: 'June 18th 2025',
      communicationName: 'in Issue #6',
      topic: 'Air Distribution',
      topicKey: 'air-distribution',
      productCategory: 'Air Handling Units (AHUs)',
      categoryKey: 'air-handling-units',
      communicationType: 'caps-update',
      communicationTypeKey: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 7,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'High-Efficiency ERV System',
      nameKey: 'high-efficiency-erv-system',
      date: 'July 22nd 2025',
      communicationName: 'in Issue #7',
      topic: 'Refrigerant Transition',
      topicKey: 'refrigerant-transition',
      productCategory: 'Energy Recovery Ventilators (ERVs)',
      categoryKey: 'energy-recovery-ventilators',
      communicationType: 'bulletin',
      communicationTypeKey: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 8,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Flexible Ductwork System',
      nameKey: 'flexible-ductwork-system',
      date: 'August 30th 2025',
      communicationName: 'in Issue #8',
      topic: 'HVAC Education and Training',
      topicKey: 'hvac-education-training',
      productCategory: 'Ductwork',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 9,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Smart Thermostat Pro',
      nameKey: 'smart-thermostat-pro',
      date: 'September 5th 2025',
      communicationName: 'in Issue #9',
      topic: 'Codes & Standards',
      productCategory: 'Thermostats',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 10,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Energy-Saving Ceiling Fan',
      nameKey: 'energy-saving-ceiling-fan',
      date: 'October 12th 2025',
      communicationName: 'in Issue #10',
      topic: 'Fan Energy Index',
      productCategory: 'Fans',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 11,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Motorized Air Damper',
      nameKey: 'motorized-air-damper',
      date: 'November 20th 2025',
      communicationName: 'in Issue #11',
      topic: 'Indoor Air Quality',
      productCategory: 'Dampers',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 12,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Architectural Louver Design',
      nameKey: 'architectural-louver-design',
      date: 'December 15th 2025',
      communicationName: 'in Issue #12',
      topic: 'System Balancing',
      productCategory: 'Louvers',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 13,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Ceiling Diffuser with Damper',
      nameKey: 'ceiling-diffuser-with-damper',
      date: 'January 8th 2026',
      communicationName: 'in Issue #13',
      topic: 'Energy Recovery',
      productCategory: 'Grilles, Registers & Diffusers',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 14,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Low-Profile Air Terminal',
      nameKey: 'low-profile-air-terminal',
      date: 'February 14th 2026',
      communicationName: 'in Issue #14',
      topic: 'Air Distribution',
      productCategory: 'Air Terminal Units',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 15,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Custom Air Handling Unit',
      nameKey: 'custom-air-handling-unit',
      date: 'March 22nd 2026',
      communicationName: 'in Issue #15',
      topic: 'Refrigerant Transition',
      productCategory: 'Air Handling Units (AHUs)',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 15,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Ceiling Exhaust Fan SP-A710-QD',
      nameKey: 'ceiling-exhaust-fan-sp-a710-qd',
      date: 'March 15th 2028',
      communicationName: 'in Issue #46',
      topic: 'Energy Recovery',
      productCategory: 'Fans',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 16,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Inline Mixed Flow Fan QEI-150',
      nameKey: 'inline-mixed-flow-fan-qei-150',
      date: 'April 10th 2028',
      communicationName: 'in Issue #47',
      topic: 'Air Distribution',
      productCategory: 'Fans',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 17,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Backdraft Damper BD-20',
      nameKey: 'backdraft-damper-bd-20',
      date: 'May 5th 2028',
      communicationName: 'in Issue #48',
      topic: 'Codes & Standards',
      productCategory: 'Dampers',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 18,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Adjustable Louver AL-30',
      nameKey: 'adjustable-louver-al-30',
      date: 'June 1st 2028',
      communicationName: 'in Issue #49',
      topics: ['Fan Energy Index', 'System Balancing'],
      productCategory: 'Louvers',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 19,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Supply Grille SG-100',
      nameKey: 'supply-grille-sg-100',
      date: 'June 25th 2028',
      communicationName: 'in Issue #50',
      topic: 'Indoor Air Quality',
      productCategory: 'Grilles, Registers & Diffusers',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 20,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'VAV Terminal Unit VAV-500',
      date: 'July 15th 2028',
      communicationName: 'in Issue #51',
      topic: 'System Balancing',
      productCategory: 'Air Terminal Units',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 21,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Modular AHU MAHU-2000',
      date: 'August 10th 2028',
      communicationName: 'in Issue #52',
      topic: 'Energy Recovery',
      productCategory: 'Air Handling Units (AHUs)',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 22,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Energy Recovery Ventilator ERV-300',
      date: 'September 5th 2028',
      communicationName: 'in Issue #53',
      topic: 'Air Distribution',
      productCategory: 'Energy Recovery Ventilators (ERVs)',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 23,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Flexible Duct FD-25',
      date: 'October 1st 2028',
      communicationName: 'in Issue #54',
      topic: 'Refrigerant Transition',
      productCategory: 'Ductwork',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 24,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Programmable Thermostat PT-100',
      date: 'October 20th 2028',
      communicationName: 'in Issue #55',
      topic: 'HVAC Education and Training',
      productCategory: 'Thermostats',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 25,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Ceiling Exhaust Fan SP-A720-QD',
      date: 'November 15th 2028',
      communicationName: 'in Issue #56',
      topic: 'Codes & Standards',
      productCategory: 'Fans',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 26,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Inline Mixed Flow Fan QEI-160',
      date: 'December 10th 2028',
      communicationName: 'in Issue #57',
      topics: ['Fan Energy Index', 'Air Distribution'],
      productCategory: 'Fans',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 27,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Backdraft Damper BD-25',
      date: 'January 5th 2029',
      communicationName: 'in Issue #58',
      topic: 'Indoor Air Quality',
      productCategory: 'Dampers',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 28,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Adjustable Louver AL-35',
      date: 'February 1st 2029',
      communicationName: 'in Issue #59',
      topic: 'System Balancing',
      productCategory: 'Louvers',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 29,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Supply Grille SG-110',
      date: 'February 25th 2029',
      communicationName: 'in Issue #60',
      topic: 'Energy Recovery',
      productCategory: 'Grilles, Registers & Diffusers',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 30,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'VAV Terminal Unit VAV-510',
      date: 'March 15th 2029',
      communicationName: 'in Issue #61',
      topic: 'Air Distribution',
      productCategory: 'Air Terminal Units',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 31,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Modular AHU MAHU-2100',
      date: 'April 10th 2029',
      communicationName: 'in Issue #62',
      topic: 'Refrigerant Transition',
      productCategory: 'Air Handling Units (AHUs)',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 32,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Energy Recovery Ventilator ERV-310',
      date: 'May 5th 2029',
      communicationName: 'in Issue #63',
      topic: 'HVAC Education and Training',
      productCategory: 'Energy Recovery Ventilators (ERVs)',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 33,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Flexible Duct FD-30',
      date: 'June 1st 2029',
      communicationName: 'in Issue #64',
      topic: 'Codes & Standards',
      productCategory: 'Ductwork',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 34,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Programmable Thermostat PT-110',
      date: 'June 25th 2029',
      communicationName: 'in Issue #65',
      topics: ['Fan Energy Index', 'Energy Recovery'],
      productCategory: 'Thermostats',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 35,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Ceiling Exhaust Fan SP-A730-QD',
      date: 'July 15th 2029',
      communicationName: 'in Issue #66',
      topic: 'Indoor Air Quality',
      productCategory: 'Fans',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 36,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Inline Mixed Flow Fan QEI-170',
      date: 'August 10th 2029',
      communicationName: 'in Issue #67',
      topic: 'System Balancing',
      productCategory: 'Fans',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 37,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Backdraft Damper BD-30',
      date: 'September 5th 2029',
      communicationName: 'in Issue #68',
      topic: 'Energy Recovery',
      productCategory: 'Dampers',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 38,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Adjustable Louver AL-40',
      date: 'October 1st 2029',
      communicationName: 'in Issue #69',
      topic: 'Air Distribution',
      productCategory: 'Louvers',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 39,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Supply Grille SG-120',
      date: 'October 20th 2029',
      communicationName: 'in Issue #70',
      topic: 'Refrigerant Transition',
      productCategory: 'Grilles, Registers & Diffusers',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 40,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'VAV Terminal Unit VAV-520',
      date: 'November 15th 2029',
      communicationName: 'in Issue #71',
      topic: 'HVAC Education and Training',
      productCategory: 'Air Terminal Units',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 41,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Ceiling Exhaust Fan SP-A740-QD',
      date: 'January 15th 2030',
      communicationName: 'in Issue #71',
      topic: 'Codes & Standards',
      productCategory: 'Fans',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 42,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Inline Mixed Flow Fan QEI-180',
      date: 'February 10th 2030',
      communicationName: 'in Issue #72',
      topic: 'Fan Energy Index',
      productCategory: 'Fans',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 43,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Backdraft Damper BD-35',
      date: 'March 5th 2030',
      communicationName: 'in Issue #73',
      topic: 'Indoor Air Quality',
      productCategory: 'Dampers',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 44,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Adjustable Louver AL-45',
      date: 'April 1st 2030',
      communicationName: 'in Issue #74',
      topic: 'System Balancing',
      productCategory: 'Louvers',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
    {
      id: 45,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Supply Grille SG-130',
      date: 'April 25th 2030',
      communicationName: 'in Issue #75',
      topic: 'Energy Recovery',
      productCategory: 'Grilles, Registers & Diffusers',
      communicationType: 'bulletin',
      communicationTypeName: 'Bulletin',
    },
    {
      id: 46,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'VAV Terminal Unit VAV-530',
      date: 'May 15th 2030',
      communicationName: 'in Issue #76',
      topic: 'Air Distribution',
      productCategory: 'Air Terminal Units',
      communicationType: 'insights',
      communicationTypeName: 'Insights',
    },
    {
      id: 47,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Modular AHU MAHU-2300',
      date: 'June 10th 2030',
      communicationName: 'in Issue #77',
      topic: 'Refrigerant Transition',
      productCategory: 'Air Handling Units (AHUs)',
      communicationType: 'caps-update',
      communicationTypeName: 'CAPS Update',
    },
    {
      id: 48,
      image: 'https://content.greenheck.com/public/DAMProd/Website_Square_Desktop/10017/DDF-10_Laying_1.png',
      name: 'Energy Recovery Ventilator ERV-330',
      date: 'July 5th 2030',
      communicationName: 'in Issue #78',
      topic: 'HVAC Education and Training',
      productCategory: 'Energy Recovery Ventilators (ERVs)',
      communicationType: 'rep-update',
      communicationTypeName: 'Rep Update',
    },
  ];

  // Current filter state is initialized at the top of the file

  // Current sort option
  let sortOption = 'relevance';

  // Number of products to display initially
  let displayCount = 24; // Changed from 6 to 24

  // Initialize the page
  function init() {
    renderProducts();
    setupEventListeners();
  }

  // Render products based on current filters and sort option
  function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '';

    // Apply filters and sort
    let filteredProducts = filterProducts(products);
    filteredProducts = sortProducts(filteredProducts);

    // Limit the number of products displayed
    const productsToShow = filteredProducts.slice(0, displayCount);

    // Create product cards
    productsToShow.forEach(product => {
      const productCard = createProductCard(product);
      productsGrid.appendChild(productCard);
    });

    // Update load more/less button
    const loadMoreButton = document.querySelector('.load-more');
    if (filteredProducts.length <= displayCount) {
      if (displayCount > 24) {
        loadMoreButton.style.display = 'block';
        loadMoreButton.textContent = 'SHOW LESS';
      } else {
        loadMoreButton.style.display = 'none';
      }
    } else {
      loadMoreButton.style.display = 'block';
      loadMoreButton.textContent = 'LOAD MORE';
    }
  }

  // Create a product card element
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    // Add special class for High-Efficiency Ceiling Fan
    if (product.name === 'High-Efficiency Ceiling Fan') {
      card.classList.add('high-efficiency-fan');
    }

    card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-meta-info"><span>${product.date}</span>, <span>${product.communicationName}</span></p>
                <p class="product-category-info"><span>${product.topic}</span> | <span>${product.productCategory}</span></p>
                <div class="product-footer">
                    <div class="product-meta">
                        <img src="${
                          product.communicationType === 'insights'
                            ? './imgs/insights-icon.svg'
                            : product.communicationType === 'caps-update'
                              ? './imgs/caps-update-icon.svg'
                              : product.communicationType === 'bulletin'
                                ? './imgs/bulletin-icon.svg'
                                : product.communicationType === 'rep-update'
                                  ? './imgs/rep-update-icon.svg'
                                  : ''
                        }" 
                            alt="${product.communicationTypeName} icon" class="communication-icon">
                        <span class="communication-type">${product.communicationTypeName}</span>
                    </div>
                    <a href="#" class="btn-orange">VIEW</a>
                </div>
            </div>
        `;

    return card;
  }

  // Filter products based on current filter state
  function filterProducts(products) {
    return products.filter(product => {
      // Keyword search
      if (filters.keyword) {
        const searchTerm = filters.keyword.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchTerm) || 
                         (product.nameKey && product.nameKey.toLowerCase().includes(searchTerm));
        const topicMatch = (product.topic.toLowerCase().includes(searchTerm) || 
                          (product.topicKey && product.topicKey.toLowerCase().includes(searchTerm)));
        const categoryMatch = (product.productCategory.toLowerCase().includes(searchTerm) || 
                             (product.categoryKey && product.categoryKey.toLowerCase().includes(searchTerm)));
        const communicationTypeMatch = (product.communicationType.toLowerCase().includes(searchTerm) || 
                                      (product.communicationTypeKey && product.communicationTypeKey.toLowerCase().includes(searchTerm)));
        const communicationTypeNameMatch = product.communicationTypeName.toLowerCase().includes(searchTerm);
        
        if (!nameMatch && !topicMatch && !categoryMatch && !communicationTypeMatch && !communicationTypeNameMatch) {
          return false;
        }
      }

      // Type filter
      if (filters.type.length > 0) {
        const productTypeLower = product.type ? product.type.toLowerCase() : '';
        const productTypeKey = product.typeKey ? product.typeKey.toLowerCase() : '';
        const matchesType = filters.type.some(type => {
          const typeFormatted = type.toLowerCase();
          return productTypeLower === typeFormatted || productTypeKey === typeFormatted;
        });
        if (!matchesType) {
          return false;
        }
      }

      // Category filter
      if (filters.category.length > 0) {
        const productCategoryLower = product.productCategory.toLowerCase();
        const productCategoryKey = product.categoryKey ? product.categoryKey.toLowerCase() : '';
        const matchesCategory = filters.category.some(category => {
          const categoryFormatted = category.toLowerCase();
          return productCategoryLower === categoryFormatted || productCategoryKey === categoryFormatted;
        });
        if (!matchesCategory) {
          return false;
        }
      }

      // Communication filter
      if (filters.communication.length > 0) {
        const productCommTypeLower = product.communicationType.toLowerCase();
        const productCommTypeKey = product.communicationTypeKey ? product.communicationTypeKey.toLowerCase() : '';
        const matchesComm = filters.communication.some(comm => {
          const commFormatted = comm.toLowerCase();
          return productCommTypeLower === commFormatted || productCommTypeKey === commFormatted;
        });
        if (!matchesComm) {
          return false;
        }
      }

      // Topic filter
      if (filters.topic.length > 0) {
        const productTopics = Array.isArray(product.topics) ? product.topics : [product.topic];
        const productTopicKeys = product.topicKey ? [product.topicKey] : [];
        const productTopicsLower = [...productTopics, ...productTopicKeys].map(t => t && t.toLowerCase().replace(/\s+/g, '-'));
        const matchesTopic = filters.topic.some(topic => {
          const topicFormatted = topic.toLowerCase().replace(/\s+/g, '-');
          return productTopicsLower.some(pt => pt && (pt === topicFormatted || pt.includes(topicFormatted)));
        });
        if (!matchesTopic) {
          return false;
        }
      }

      return true;
    });
  }

  // Check if product matches keyword search
  function productMatchesKeyword(product, keyword) {
    const searchTerm = keyword.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  // Sort products based on current sort option
  function sortProducts(products) {
    const sortedProducts = [...products];

    const parseCustomDate = (dateStr) => {
      const months = {
        'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
        'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
      };
      const [month, dayWithSuffix, year] = dateStr.split(' ');
      const day = parseInt(dayWithSuffix.replace(/(?:st|nd|rd|th)/, ''));
      return new Date(parseInt(year), months[month], day);
    };

    switch (sortOption) {
      case 'newest':
        sortedProducts.sort((a, b) => parseCustomDate(b.date) - parseCustomDate(a.date));
        break;
      case 'oldest':
        sortedProducts.sort((a, b) => parseCustomDate(a.date) - parseCustomDate(b.date));
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Keep the original order for default case
        break;
    }

    return sortedProducts;
  }

  // Set up event listeners for filters and sorting
  function setupEventListeners() {
    // Topic filters
    const topicCheckboxes = document.querySelectorAll('input[name="topic"]');
    topicCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        updateFilterArray('topic', this);
        displayCount = 6; // Reset display count when filter changes
        renderProducts();
      });
    });
    // Keyword search
    const keywordInput = document.getElementById('keyword-search');
    keywordInput.addEventListener(
      'input',
      debounce(function () {
        filters.keyword = this.value.trim();
        displayCount = 6; // Reset display count when filter changes
        renderProducts();
      }, 300)
    );

    // Type filters
    const typeCheckboxes = document.querySelectorAll('input[name="type"]');
    typeCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        updateFilterArray('type', this);
        displayCount = 6; // Reset display count when filter changes
        renderProducts();
      });
    });

    // Category filters
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    categoryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        updateFilterArray('category', this);
        displayCount = 6; // Reset display count when filter changes
        renderProducts();
      });
    });

    // Communication filters
    const communicationCheckboxes = document.querySelectorAll('input[name="communication"]');
    communicationCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        updateFilterArray('communication', this);
        displayCount = 6; // Reset display count when filter changes
        renderProducts();
      });
    });

    // Sort options
    const sortSelect = document.getElementById('sort-by');
    sortSelect.addEventListener('change', function () {
      sortOption = this.value;
      renderProducts();
    });

    // Load more/less button
    const loadMoreButton = document.querySelector('.load-more');
    loadMoreButton.addEventListener('click', function () {
      if (this.textContent === 'SHOW LESS') {
        displayCount = 24; // Reset to initial display count
      } else {
        displayCount += 24;
      }
      renderProducts();
    });

    // Clear all filters
    const clearFiltersLink = document.querySelector('.clear-filters');
    clearFiltersLink.addEventListener('click', function (e) {
      e.preventDefault();
      clearAllFilters();
      renderProducts();
    });
    // View toggle buttons
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productsGrid = document.getElementById('products-grid');

    gridViewBtn.addEventListener('click', function() {
      gridViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      productsGrid.classList.remove('list-view');
      renderProducts();
    });

    listViewBtn.addEventListener('click', function() {
      listViewBtn.classList.add('active');
      gridViewBtn.classList.remove('active');
      productsGrid.classList.add('list-view');
      renderProducts();
    });
  }

  // Update filter arrays when checkboxes change
  function updateFilterArray(filterType, checkbox) {
    // Normalize the value by removing spaces and converting to lowercase
    const rawValue = checkbox.value;
    const value = rawValue === 'all' ? 'all' : rawValue.toLowerCase().replace(/\s+/g, '');

    if (checkbox.checked) {
      // If 'all' is selected, clear other selections for this filter type
      if (value === 'all') {
        filters[filterType] = ['all'];
        // Uncheck other checkboxes in this group
        document.querySelectorAll(`input[name="${filterType}"]:not([value="all"])`).forEach(cb => {
          cb.checked = false;
        });
      } else {
        // If a specific value is selected, remove 'all' if it's in the array
        const allIndex = filters[filterType].indexOf('all');
        if (allIndex !== -1) {
          filters[filterType].splice(allIndex, 1);
          // Uncheck the 'all' checkbox
          document.querySelector(`input[name="${filterType}"][value="all"]`).checked = false;
        }
        // Add the normalized value to the filter array
        filters[filterType].push(value);
      }
    } else {
      // Remove the value from the filter array
      const index = filters[filterType].indexOf(value);
      if (index !== -1) {
        filters[filterType].splice(index, 1);
      }
    }
  }

  // Clear all filters
  function clearAllFilters() {
    // Reset filter state
    filters = {
      keyword: '',
      type: [],
      category: [],
      communication: [],
      topic: [],
    };

    // Reset keyword input
    document.getElementById('keyword-search').value = '';

    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    // Reset sort option
    document.getElementById('sort-by').value = 'relevance';
    sortOption = 'relevance';

    // Reset display count
    displayCount = 6;
  }

  // Debounce function to limit how often a function can be called
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Initialize the page
  init();
});
