const STORAGE_KEY = "threeDPrintPricingGuideStateV2";

const defaultState = {
  settings: {
    energyCost: 0,
    laborCost: 0,
    cadCost: 0,
    failureRate: 0,
    defaultMarkup: 0,
    setupFee: 0,
    supplierName: "",
    supplierEmail: "",
    supplierPhone: "",
    supplierAddress: "",
    supplierNotes: "",
    bankingDetails: "",
    vatEnabled: false,
    vatRate: 15,
    vatNumber: "",
  },
  quote: {
    documentType: "quote",
    documentNumber: "",
    customer: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    jobNotes: "",
  },
  materials: [],
  printers: [],
  components: [
    {
      id: "part-1",
      name: "COMPONENT 1",
      printerId: "",
      materialId: "",
      weight: 0,
      printHours: 0,
      prep: 15,
      slice: 10,
      materialChange: 0,
      transfer: 5,
      jobRemoval: 5,
      supportRemoval: 0,
      additionalWork: 0,
      adminCommunication: 5,
      cadDesign: 0,
      consumables: 0,
      markup: 0,
      gcodeFileName: "",
      gcodeImportSummary: "",
      gcodeFile: null,
    },
  ],
};

let state = loadState();

const printerCatalog = {
  "Bambu Lab": [
    { name: "A1 Mini", type: "Bedslinger FDM", buildVolume: "180x180x180 mm", bestFor: "Cheapest/easiest Bambu", ratedPower: "", powerEstimate: "0.08 kWh/h", energyConsumption: 0.08 },
    { name: "A1", type: "Bedslinger FDM", buildVolume: "256x256x256 mm", bestFor: "Best beginner all-rounder", ratedPower: "", powerEstimate: "0.09-0.12 kWh/h", energyConsumption: 0.105 },
    { name: "A2L", type: "Large bedslinger FDM", buildVolume: "330x320x325 mm", bestFor: "Bigger prints than A1", ratedPower: "", powerEstimate: "0.12-0.18 kWh/h", energyConsumption: 0.15 },
    { name: "P1S", type: "Enclosed CoreXY FDM", buildVolume: "256x256x256 mm", bestFor: "Fast enclosed printing", ratedPower: "", powerEstimate: "0.10-0.14 kWh/h", energyConsumption: 0.12 },
    { name: "X1 Carbon", type: "Enclosed CoreXY FDM", buildVolume: "256x256x256 mm", bestFor: "Premium, lidar/camera features", ratedPower: "", powerEstimate: "0.10-0.15 kWh/h", energyConsumption: 0.125 },
    { name: "H2D", type: "Dual-nozzle CoreXY / maker machine", buildVolume: "Large format", bestFor: "Multi-material / advanced users", ratedPower: "", powerEstimate: "likely 0.15-0.30+ kWh/h", energyConsumption: 0.225 },
    { name: "X2D", type: "Newer dual-nozzle model", buildVolume: "around 256x260 mm main nozzle area", bestFor: "High-end multi-material", ratedPower: "", powerEstimate: "likely 0.15-0.25+ kWh/h", energyConsumption: 0.2 },
  ],
  Creality: [
    { name: "Ender-3 V3 SE", type: "Bedslinger FDM", buildVolume: "220-ish class", bestFor: "Budget beginner", ratedPower: "", powerEstimate: "0.07-0.12 kWh/h", energyConsumption: 0.095 },
    { name: "Ender-3 V3 KE", type: "Bedslinger FDM", buildVolume: "220-ish class", bestFor: "Faster budget printer", ratedPower: "", powerEstimate: "0.08-0.14 kWh/h", energyConsumption: 0.11 },
    { name: "Ender-3 V3", type: "CoreXZ bedslinger FDM", buildVolume: "220-ish class", bestFor: "Better motion system", ratedPower: "", powerEstimate: "0.08-0.15 kWh/h", energyConsumption: 0.115 },
    { name: "Ender-3 V3 Plus", type: "Larger CoreXZ FDM", buildVolume: "bigger than V3", bestFor: "Larger home prints", ratedPower: "", powerEstimate: "0.12-0.20 kWh/h", energyConsumption: 0.16 },
    { name: "Ender-3 V4", type: "New Ender model", buildVolume: "current/new", bestFor: "Budget modern Creality", ratedPower: "", powerEstimate: "likely 0.08-0.16 kWh/h", energyConsumption: 0.12 },
    { name: "Ender-5 Max", type: "Larger frame FDM", buildVolume: "large format", bestFor: "Bigger stable prints", ratedPower: "", powerEstimate: "likely 0.15-0.25+ kWh/h", energyConsumption: 0.2 },
    { name: "K1C", type: "Enclosed CoreXY FDM", buildVolume: "220-ish class", bestFor: "Fast enclosed printing", ratedPower: "", powerEstimate: "0.10-0.18 kWh/h", energyConsumption: 0.14 },
    { name: "K1 Max", type: "Enclosed CoreXY FDM", buildVolume: "300x300x300 mm class", bestFor: "Bigger fast prints", ratedPower: "", powerEstimate: "0.15-0.25 kWh/h", energyConsumption: 0.2 },
    { name: "K2 Plus Combo", type: "Enclosed CoreXY + multicolour", buildVolume: "350x350x350 mm", bestFor: "Large multicolour prints", ratedPower: "1200 W rated power", powerEstimate: "0.20-0.35+ kWh/h", energyConsumption: 0.275 },
    { name: "CR-30", type: "Belt printer", buildVolume: "continuous Z/belt", bestFor: "Batch printing", ratedPower: "", powerEstimate: "0.10-0.20 kWh/h", energyConsumption: 0.15 },
    { name: "HALOT R6", type: "Resin LCD", buildVolume: "130.56 x 82.62 x 160 mm", bestFor: "Budget resin", ratedPower: "", powerEstimate: "0.04-0.08 kWh/h", energyConsumption: 0.06 },
    { name: "HALOT-MAGE", type: "Resin LCD", buildVolume: "228 x 128 x 230 mm", bestFor: "Detailed resin prints", ratedPower: "", powerEstimate: "0.06-0.12 kWh/h", energyConsumption: 0.09 },
    { name: "HALOT-MAGE PRO", type: "Resin LCD", buildVolume: "228 x 128 x 230 mm", bestFor: "Detailed resin prints", ratedPower: "", powerEstimate: "0.06-0.12 kWh/h", energyConsumption: 0.09 },
    { name: "HALOT-MAGE S", type: "Resin LCD", buildVolume: "223 x 126 x 230 mm", bestFor: "Detailed resin prints", ratedPower: "", powerEstimate: "0.06-0.12 kWh/h", energyConsumption: 0.09 },
    { name: "HALOT-X1", type: "Resin LCD", buildVolume: "211.68 x 118.37 x 200 mm", bestFor: "Current resin option", ratedPower: "", powerEstimate: "likely 0.06-0.12 kWh/h", energyConsumption: 0.09 },
  ],
  Prusa: [
    { name: "Prusa MINI+", type: "Compact bedslinger FDM", buildVolume: "180x180x180 mm", bestFor: "Small reliable printer", ratedPower: "", powerEstimate: "0.05-0.09 kWh/h", energyConsumption: 0.07 },
    { name: "Prusa MK4S", type: "Bedslinger FDM", buildVolume: "250x210x220 mm", bestFor: "Reliable general use", ratedPower: "", powerEstimate: "0.08 kWh/h PLA, 0.12 kWh/h ABS", energyConsumption: 0.08 },
    { name: "Prusa CORE One / One+", type: "Enclosed CoreXY FDM", buildVolume: "250x220x270 mm", bestFor: "Enclosed reliable printing", ratedPower: "", powerEstimate: "0.09 kWh/h PLA, 0.11 kWh/h ABS", energyConsumption: 0.09 },
    { name: "Prusa CORE One L", type: "Larger enclosed CoreXY", buildVolume: "300x300x330 mm", bestFor: "Larger enclosed prints", ratedPower: "", powerEstimate: "likely 0.12-0.20 kWh/h", energyConsumption: 0.16 },
    { name: "Prusa XL", type: "Large CoreXY toolchanger", buildVolume: "360x360x360 mm", bestFor: "Multi-tool / pro use", ratedPower: "", powerEstimate: "0.15-0.30+ kWh/h", energyConsumption: 0.225 },
    { name: "Prusa SL1S", type: "Resin MSLA", buildVolume: "127x80x150 mm", bestFor: "High-detail resin", ratedPower: "", powerEstimate: "0.05-0.10 kWh/h", energyConsumption: 0.075 },
  ],
  Anycubic: [
    { name: "Kobra X", type: "Bedslinger FDM", buildVolume: "medium class", bestFor: "Budget FDM", ratedPower: "", powerEstimate: "0.08-0.15 kWh/h", energyConsumption: 0.115 },
    { name: "Kobra 3 / Kobra 3 Combo", type: "Bedslinger FDM + colour system", buildVolume: "medium class", bestFor: "Budget multicolour", ratedPower: "", powerEstimate: "0.10-0.18 kWh/h", energyConsumption: 0.14 },
    { name: "Kobra 3 V2 Combo", type: "Updated Kobra 3", buildVolume: "larger than prior Kobra 3", bestFor: "Improved multicolour", ratedPower: "", powerEstimate: "0.10-0.20 kWh/h", energyConsumption: 0.15 },
    { name: "Kobra 3 Max Combo", type: "Large bedslinger FDM", buildVolume: "very large", bestFor: "Large-format printing", ratedPower: "", powerEstimate: "0.18-0.35+ kWh/h", energyConsumption: 0.265 },
    { name: "Kobra 4 Combo", type: "Newer FDM combo", buildVolume: "current model", bestFor: "Newer multicolour option", ratedPower: "", powerEstimate: "likely 0.10-0.22 kWh/h", energyConsumption: 0.16 },
    { name: "Kobra S1 Combo", type: "Enclosed CoreXY FDM", buildVolume: "medium enclosed", bestFor: "ABS/ASA-friendly enclosed printing", ratedPower: "", powerEstimate: "0.12-0.22 kWh/h", energyConsumption: 0.17 },
    { name: "Kobra S1 Max Combo", type: "Larger enclosed FDM", buildVolume: "large enclosed", bestFor: "Big enclosed prints", ratedPower: "", powerEstimate: "0.18-0.35+ kWh/h", energyConsumption: 0.265 },
    { name: "Kobra S1 ACE 2 Pro Combo", type: "Enclosed/multicolour FDM", buildVolume: "current combo", bestFor: "Multicolour enclosed printing", ratedPower: "", powerEstimate: "likely 0.15-0.30 kWh/h", energyConsumption: 0.225 },
    { name: "Photon P1", type: "Resin LCD", buildVolume: "223x126x230 mm single platform", bestFor: "Higher-end resin", ratedPower: "", powerEstimate: "0.06-0.12 kWh/h", energyConsumption: 0.09 },
    { name: "Photon Mono 4", type: "Resin LCD", buildVolume: "smaller resin", bestFor: "Entry resin", ratedPower: "", powerEstimate: "0.04-0.08 kWh/h", energyConsumption: 0.06 },
    { name: "Photon Mono M7 Pro", type: "Resin LCD", buildVolume: "medium resin", bestFor: "Fast detailed resin", ratedPower: "", powerEstimate: "0.06-0.12 kWh/h", energyConsumption: 0.09 },
    { name: "Photon Mono M7 Max", type: "Resin LCD", buildVolume: "large resin", bestFor: "Big resin prints", ratedPower: "", powerEstimate: "0.10-0.18 kWh/h", energyConsumption: 0.14 },
  ],
};

const els = {
  tabs: document.querySelectorAll(".tab"),
  views: document.querySelectorAll(".view"),
  sidebarQuotedPrice: document.getElementById("sidebarQuotedPrice"),
  documentTypeInput: document.getElementById("documentTypeInput"),
  documentNumberInput: document.getElementById("documentNumberInput"),
  customerInput: document.getElementById("customerInput"),
  clientEmailInput: document.getElementById("clientEmailInput"),
  clientPhoneInput: document.getElementById("clientPhoneInput"),
  clientAddressInput: document.getElementById("clientAddressInput"),
  dateInput: document.getElementById("dateInput"),
  descriptionInput: document.getElementById("descriptionInput"),
  jobNotesInput: document.getElementById("jobNotesInput"),
  exportPdfBtn: document.getElementById("exportPdfBtn"),
  componentsGrid: document.getElementById("componentsGrid"),
  componentCount: document.getElementById("componentCount"),
  summaryStats: document.getElementById("summaryStats"),
  breakdownLegend: document.getElementById("breakdownLegend"),
  materialsTable: document.getElementById("materialsTable"),
  printersTable: document.getElementById("printersTable"),
  addComponentBtn: document.getElementById("addComponentBtn"),
  addMaterialBtn: document.getElementById("addMaterialBtn"),
  addPrinterBtn: document.getElementById("addPrinterBtn"),
  printerModal: document.getElementById("printerModal"),
  closePrinterModalBtn: document.getElementById("closePrinterModalBtn"),
  printerBrandSelect: document.getElementById("printerBrandSelect"),
  printerModelSelect: document.getElementById("printerModelSelect"),
  printerPresetPreview: document.getElementById("printerPresetPreview"),
  addCustomPrinterBtn: document.getElementById("addCustomPrinterBtn"),
  confirmPrinterPresetBtn: document.getElementById("confirmPrinterPresetBtn"),
  serviceCostHelpBtn: document.getElementById("serviceCostHelpBtn"),
  lifeHoursHelpBtn: document.getElementById("lifeHoursHelpBtn"),
  depreciationHelpBtn: document.getElementById("depreciationHelpBtn"),
  toast: document.getElementById("toast"),
  toastContent: document.getElementById("toastContent"),
  toastCloseBtn: document.getElementById("toastCloseBtn"),
  resetBtn: document.getElementById("resetBtn"),
  energyCostHelpBtn: document.getElementById("energyCostHelpBtn"),
  laborCostHelpBtn: document.getElementById("laborCostHelpBtn"),
  cadCostHelpBtn: document.getElementById("cadCostHelpBtn"),
  failureRateHelpBtn: document.getElementById("failureRateHelpBtn"),
  energyCostInput: document.getElementById("energyCostInput"),
  laborCostInput: document.getElementById("laborCostInput"),
  cadCostInput: document.getElementById("cadCostInput"),
  failureRateInput: document.getElementById("failureRateInput"),
  defaultMarkupInput: document.getElementById("defaultMarkupInput"),
  setupFeeInput: document.getElementById("setupFeeInput"),
  supplierNameInput: document.getElementById("supplierNameInput"),
  supplierEmailInput: document.getElementById("supplierEmailInput"),
  supplierPhoneInput: document.getElementById("supplierPhoneInput"),
  supplierAddressInput: document.getElementById("supplierAddressInput"),
  supplierNotesInput: document.getElementById("supplierNotesInput"),
  bankingDetailsInput: document.getElementById("bankingDetailsInput"),
  vatEnabledInput: document.getElementById("vatEnabledInput"),
  vatRateInput: document.getElementById("vatRateInput"),
  vatNumberInput: document.getElementById("vatNumberInput"),
  printDocument: document.getElementById("printDocument"),
  componentTemplate: document.getElementById("componentTemplate"),
};

const costColors = {
  filament: "#3f67aa",
  electricity: "#de8a37",
  depreciation: "#848b8f",
  preparation: "#dfad00",
  postProcessing: "#5b8eb9",
  cadDesign: "#b46cc8",
  setupFee: "#7f6a55",
  consumables: "#6d9d3d",
  scrap: "#6285c6",
  markup: "#f18842",
};

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved ? mergeState(defaultState, saved) : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

function mergeState(base, saved) {
  return {
    ...structuredClone(base),
    ...saved,
    settings: { ...base.settings, ...saved.settings },
    quote: { ...base.quote, ...saved.quote },
    materials: Array.isArray(saved.materials) ? saved.materials : base.materials,
    printers: Array.isArray(saved.printers) ? saved.printers : base.printers,
    components: saved.components?.length ? saved.components : base.components,
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function money(value) {
  return `R ${Number(value || 0).toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function num(value) {
  return Number(value) || 0;
}

function numWithDefault(value, fallback) {
  return value === undefined || value === null || value === "" ? fallback : num(value);
}

function materialPricePerGram(material) {
  if (!material?.spoolKg) return 0;
  return num(material.spoolPrice) / (num(material.spoolKg) * 1000);
}

function printerDepreciationPerHour(printer) {
  if (!printer?.depreciationHours) return 0;
  return (num(printer.price) + num(printer.serviceCosts)) / num(printer.depreciationHours);
}

function calculateComponent(component) {
  component.markup = num(state.settings.defaultMarkup);
  component.setupFee = num(state.settings.setupFee);
  const material = state.materials.find((item) => item.id === component.materialId);
  const printer = state.printers.find((item) => item.id === component.printerId);
  const adminCommunication = numWithDefault(component.adminCommunication, 5);
  const preparationMinutes = num(component.prep) + num(component.slice) + num(component.transfer) + adminCommunication;
  const postProcessingMinutes = num(component.jobRemoval) + num(component.supportRemoval) + num(component.additionalWork);
  const totalLabourMinutes = preparationMinutes + postProcessingMinutes + num(component.materialChange);
  const filament = num(component.weight) * materialPricePerGram(material);
  const electricity = num(component.printHours) * num(printer?.energyConsumption) * num(state.settings.energyCost);
  const depreciation = num(component.printHours) * printerDepreciationPerHour(printer);
  const preparation = ((preparationMinutes + num(component.materialChange)) / 60) * num(state.settings.laborCost);
  const postProcessing = (postProcessingMinutes / 60) * num(state.settings.laborCost);
  const cadDesignMinutes = num(component.cadDesign);
  const cadDesign = (cadDesignMinutes / 60) * num(state.settings.cadCost);
  const consumables = num(component.consumables);
  const setupFee = num(component.setupFee);
  const subtotal = filament + electricity + depreciation + preparation + postProcessing + cadDesign + consumables + setupFee;
  const scrap = subtotal * (num(state.settings.failureRate) / 100);
  const withFailures = subtotal + scrap;
  const markup = withFailures * (num(component.markup) / 100);
  const quoted = withFailures + markup;

  return {
    weight: num(component.weight),
    printHours: num(component.printHours),
    preparationMinutes,
    postProcessingMinutes,
    totalLabourMinutes,
    cadDesignMinutes,
    filament,
    electricity,
    depreciation,
    preparation,
    postProcessing,
    cadDesign,
    consumables,
    setupFee,
    subtotal,
    scrap,
    withFailures,
    markup,
    quoted,
  };
}

function calculateTotals() {
  const totals = state.components.map(calculateComponent).reduce(
    (totals, item) => {
      Object.keys(totals).forEach((key) => {
        totals[key] += item[key] || 0;
      });
      return totals;
    },
    {
      weight: 0,
      printHours: 0,
      preparationMinutes: 0,
      postProcessingMinutes: 0,
      totalLabourMinutes: 0,
      cadDesignMinutes: 0,
      filament: 0,
      electricity: 0,
      depreciation: 0,
      preparation: 0,
      postProcessing: 0,
      cadDesign: 0,
      consumables: 0,
      setupFee: 0,
      subtotal: 0,
      scrap: 0,
      withFailures: 0,
      markup: 0,
      quoted: 0,
    }
  );
  totals.vat = 0;
  totals.totalDue = totals.quoted;
  if (state.settings.vatEnabled) {
    totals.vat = totals.quoted * (num(state.settings.vatRate) / 100);
    totals.totalDue = totals.quoted + totals.vat;
  }
  return totals;
}

function render() {
  renderQuoteDetails();
  renderComponents();
  renderSummary();
  renderCatalogs();
  renderSettings();
  saveState();
}

function renderQuoteDetails() {
  els.documentTypeInput.value = state.quote.documentType || "quote";
  els.documentNumberInput.value = state.quote.documentNumber || "";
  els.customerInput.value = state.quote.customer;
  els.clientEmailInput.value = state.quote.clientEmail || "";
  els.clientPhoneInput.value = state.quote.clientPhone || "";
  els.clientAddressInput.value = state.quote.clientAddress || "";
  els.dateInput.value = state.quote.date;
  els.descriptionInput.value = state.quote.description;
  els.jobNotesInput.value = state.quote.jobNotes || "";
}

function renderComponents() {
  els.componentsGrid.innerHTML = "";
  els.componentCount.textContent = `${state.components.length} ${state.components.length === 1 ? "part" : "parts"}`;

  state.components.forEach((component) => {
    const card = els.componentTemplate.content.firstElementChild.cloneNode(true);
    const totals = calculateComponent(component);
    card.dataset.id = component.id;

    bindField(card, ".part-name", component.name, "name");
    bindSelect(card, ".printer-select", state.printers, component.printerId, "printerId");
    bindSelect(card, ".material-select", state.materials, component.materialId, "materialId");
    bindField(card, ".weight-input", component.weight, "weight");
    bindField(card, ".print-hours-input", component.printHours, "printHours");
    bindField(card, ".prep-input", component.prep, "prep");
    bindField(card, ".slice-input", component.slice, "slice");
    bindField(card, ".material-change-input", component.materialChange, "materialChange");
    bindField(card, ".transfer-input", component.transfer, "transfer");
    bindField(card, ".job-removal-input", component.jobRemoval, "jobRemoval");
    bindField(card, ".support-removal-input", component.supportRemoval, "supportRemoval");
    bindField(card, ".additional-work-input", component.additionalWork, "additionalWork");
    bindField(card, ".admin-communication-input", component.adminCommunication ?? 5, "adminCommunication");
    bindField(card, ".cad-design-input", component.cadDesign || 0, "cadDesign");
    bindField(card, ".consumables-input", component.consumables, "consumables");
    bindField(card, ".setup-fee-input", formatCurrencyInput(state.settings.setupFee), "setupFee");
    bindField(card, ".markup-input", component.markup, "markup");
    bindGcodeUpload(card, component);

    card.querySelector(".subtotal-output").textContent = money(totals.subtotal);
    card.querySelector(".failure-output").textContent = money(totals.withFailures);
    card.querySelector(".quoted-output").textContent = money(totals.quoted);
    card.querySelector(".remove-component").addEventListener("click", () => {
      if (state.components.length === 1) return;
      state.components = state.components.filter((item) => item.id !== component.id);
      render();
    });

    els.componentsGrid.appendChild(card);
  });
}

function bindField(scope, selector, value, key) {
  const input = scope.querySelector(selector);
  input.value = value;
  input.addEventListener("input", () => {
    const component = state.components.find((item) => item.id === scope.dataset.id);
    component[key] = input.type === "number" ? num(input.value) : input.value;
    refreshCalculatedViews();
  });
}

function bindSelect(scope, selector, options, value, key) {
  const select = scope.querySelector(selector);
  select.innerHTML = options.length
    ? [`<option value="">Select ${key === "printerId" ? "printer" : "material"}</option>`, ...options.map((option) => `<option value="${option.id}">${escapeHtml(optionLabel(option, key))}</option>`)].join("")
    : `<option value="">Add ${key === "printerId" ? "a printer" : "a material"} in Setup</option>`;
  select.value = value;
  select.disabled = !options.length;
  select.addEventListener("change", () => {
    const component = state.components.find((item) => item.id === scope.dataset.id);
    component[key] = select.value;
    refreshCalculatedViews();
  });
}

function optionLabel(option, key) {
  if (key !== "materialId") return option.name;
  const diameter = num(option.diameter) ? `${num(option.diameter)} mm` : "";
  return [option.name, option.type, option.colour, diameter].filter(Boolean).join(" - ") || "Unnamed material";
}

function refreshQuoteSelectOptions() {
  document.querySelectorAll(".component-card").forEach((card) => {
    const component = state.components.find((item) => item.id === card.dataset.id);
    if (!component) return;
    updateSelectOptions(card.querySelector(".printer-select"), state.printers, component.printerId, "printerId");
    updateSelectOptions(card.querySelector(".material-select"), state.materials, component.materialId, "materialId");
  });
}

function updateSelectOptions(select, options, value, key) {
  select.innerHTML = options.length
    ? [`<option value="">Select ${key === "printerId" ? "printer" : "material"}</option>`, ...options.map((option) => `<option value="${option.id}">${escapeHtml(optionLabel(option, key))}</option>`)].join("")
    : `<option value="">Add ${key === "printerId" ? "a printer" : "a material"} in Setup</option>`;
  select.value = value || "";
  select.disabled = !options.length;
}

function bindGcodeUpload(scope, component) {
  const input = scope.querySelector(".gcode-input");
  const button = scope.querySelector(".load-gcode-button");
  const fileControl = scope.querySelector(".file-control");
  const fileName = scope.querySelector(".gcode-file-name");
  const clearButton = scope.querySelector(".clear-gcode-button");
  fileName.textContent = component.gcodeFileName || "No file selected";
  button.disabled = !component.gcodeFile;
  button.title = component.gcodeFile ? "Load selected G-code data into this component" : "Choose a G-code file first";
  clearButton.hidden = !component.gcodeFileName;
  fileControl.addEventListener("click", (event) => {
    if (event.target === clearButton) return;
    input.click();
  });
  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (!file) return;
    component.gcodeFile = file;
    fileName.textContent = file.name;
    component.gcodeFileName = file.name;
    component.gcodeImportSummary = "";
    button.disabled = false;
    button.title = "Load selected G-code data into this component";
    clearButton.hidden = false;
    saveState();
  });

  clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    component.gcodeFile = null;
    component.gcodeFileName = "";
    component.gcodeImportSummary = "";
    input.value = "";
    fileName.textContent = "No file selected";
    button.disabled = true;
    button.title = "Choose a G-code file first";
    clearButton.hidden = true;
    saveState();
  });

  button.addEventListener("click", async () => {
    const file = component.gcodeFile;
    if (!file) return;
    button.textContent = "Loading...";
    button.disabled = true;
    try {
      const text = await file.text();
      const material = state.materials.find((item) => item.id === component.materialId);
      const parsed = parseGcode(text, material);
      component.gcodeImportSummary = parsed.summary;
      if (parsed.weightGrams != null) {
        component.weight = Number(parsed.weightGrams.toFixed(2));
        scope.querySelector(".weight-input").value = component.weight;
      }
      if (parsed.printHours != null) {
        component.printHours = Number(parsed.printHours.toFixed(2));
        scope.querySelector(".print-hours-input").value = component.printHours;
      }
      refreshCalculatedViews();
    } catch {
      component.gcodeImportSummary = "Could not read file";
    } finally {
      button.textContent = "Apply g-code Data";
      button.disabled = false;
    }
  });
}

function parseGcode(text, material) {
  const result = {
    filamentMm: matchNumber(text, /;\s*filament used \[mm\]\s*=\s*([\d.]+)/i) ?? matchNumber(text, /;\s*Filament used:\s*([\d.]+)\s*mm/i),
    filamentCm3: matchNumber(text, /;\s*filament used \[cm3\]\s*=\s*([\d.]+)/i),
    weightGrams: matchNumber(text, /;\s*filament used \[g\]\s*=\s*([\d.]+)/i),
    density: matchNumber(text, /;\s*filament_density[:\s=]+([\d.]+)/i) ?? num(material?.density),
    diameter: matchNumber(text, /;\s*filament_diameter[:\s=]+([\d.]+)/i) ?? num(material?.diameter),
    estimatedTime: matchText(text, /;\s*estimated printing time \(normal mode\)\s*=\s*([^\r\n]+)/i) ?? matchText(text, /;\s*TIME:\s*(\d+)/i),
    elapsedSeconds: lastNumber(text, /;\s*TIME_ELAPSED:([\d.]+)/gi),
  };

  if (result.weightGrams == null && result.filamentCm3 != null && result.density) {
    result.weightGrams = result.filamentCm3 * result.density;
  }

  if (result.weightGrams == null && result.filamentMm != null && result.diameter && result.density) {
    const radius = result.diameter / 2;
    const volumeMm3 = Math.PI * radius * radius * result.filamentMm;
    result.weightGrams = (volumeMm3 / 1000) * result.density;
  }

  const printSeconds = parseDuration(result.estimatedTime) ?? result.elapsedSeconds;
  const found = [];
  if (result.weightGrams != null) found.push(`${result.weightGrams.toFixed(2)} g`);
  if (printSeconds != null) found.push(formatDuration(printSeconds));

  return {
    ...result,
    printHours: printSeconds == null ? null : printSeconds / 3600,
    summary: found.length ? `Imported ${found.join(" / ")}` : "No quote fields found",
  };
}

function matchNumber(text, pattern) {
  const match = text.match(pattern);
  return match ? Number(match[1]) : null;
}

function lastNumber(text, pattern) {
  let value = null;
  for (const match of text.matchAll(pattern)) value = Number(match[1]);
  return value;
}

function matchText(text, pattern) {
  const match = text.match(pattern);
  return match ? match[1].trim() : null;
}

function parseDuration(value) {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);
  const hours = matchNumber(value, /(\d+(?:\.\d+)?)\s*h/i) || 0;
  const minutes = matchNumber(value, /(\d+(?:\.\d+)?)\s*m/i) || 0;
  const seconds = matchNumber(value, /(\d+(?:\.\d+)?)\s*s/i) || 0;
  const total = hours * 3600 + minutes * 60 + seconds;
  return total || null;
}

function formatDuration(seconds) {
  const rounded = Math.round(seconds);
  const hours = Math.floor(rounded / 3600);
  const minutes = Math.floor((rounded % 3600) / 60);
  return `${hours}h ${minutes}m`;
}

function openPrinterModal() {
  renderPrinterModalBrands();
  els.printerModal.hidden = false;
}

function closePrinterModal() {
  els.printerModal.hidden = true;
}

function renderPrinterModalBrands() {
  const brands = Object.keys(printerCatalog);
  els.printerBrandSelect.innerHTML = brands.map((brand) => `<option value="${brand}">${brand}</option>`).join("");
  els.printerBrandSelect.value = brands[0] || "";
  renderPrinterModalModels();
}

function renderPrinterModalModels() {
  const models = printerCatalog[els.printerBrandSelect.value] || [];
  els.printerModelSelect.innerHTML = models.map((model, index) => `<option value="${index}">${model.name}</option>`).join("");
  els.printerModelSelect.disabled = !models.length;
  renderPrinterPresetPreview();
}

function selectedPrinterPreset() {
  const models = printerCatalog[els.printerBrandSelect.value] || [];
  return models[Number(els.printerModelSelect.value)] || null;
}

function renderPrinterPresetPreview() {
  const preset = selectedPrinterPreset();
  els.confirmPrinterPresetBtn.disabled = !preset;
  if (!preset) {
    els.printerPresetPreview.innerHTML = `<p>No printer selected</p>`;
    return;
  }

  els.printerPresetPreview.innerHTML = `
    <h3>${escapeHtml(els.printerBrandSelect.value)} ${escapeHtml(preset.name)}</h3>
    <div class="preview-row"><span>Type</span><strong>${escapeHtml(preset.type)}</strong></div>
    <div class="preview-row"><span>Build volume</span><strong>${escapeHtml(preset.buildVolume)}</strong></div>
    <div class="preview-row"><span>Power estimate</span><strong>${escapeHtml(preset.powerEstimate)}</strong></div>
    <div class="preview-row"><span>Autofill kWh/h</span><strong>${preset.energyConsumption.toFixed(3)}</strong></div>
  `;
}

function addPrinterFromData(data) {
  state.printers.push({
    id: makeId("printer"),
    name: data.name,
    type: data.type || "",
    buildVolume: data.buildVolume || "",
    ratedPower: data.ratedPower || data.powerEstimate || "",
    price: 0,
    depreciationHours: 0,
    serviceCosts: 0,
    energyConsumption: num(data.energyConsumption),
  });
  state.components.forEach((component) => {
    if (!component.printerId) component.printerId = state.printers[state.printers.length - 1].id;
  });
  closePrinterModal();
  render();
}

function showToast(message, anchor) {
  els.toastContent.innerHTML = message;
  els.toast.hidden = false;
  positionToast(anchor);
}

function positionToast(anchor) {
  const margin = 10;
  const anchorRect = anchor.getBoundingClientRect();
  const toastRect = els.toast.getBoundingClientRect();
  let left = anchorRect.right + margin;
  let top = anchorRect.top;

  if (left + toastRect.width > window.innerWidth - margin) {
    left = anchorRect.left - toastRect.width - margin;
  }

  if (left < margin) left = margin;
  if (top + toastRect.height > window.innerHeight - margin) {
    top = window.innerHeight - toastRect.height - margin;
  }
  if (top < margin) top = margin;

  els.toast.style.left = `${left}px`;
  els.toast.style.top = `${top}px`;
}

function renderSummary() {
  const totals = calculateTotals();
  els.sidebarQuotedPrice.textContent = money(totals.totalDue);
  const rows = [
    ["Weight", `${totals.weight.toFixed(1)} g`],
    ["Printing time", `${totals.printHours.toFixed(2)} h`],
    ["Active labour", `${totals.totalLabourMinutes.toFixed(0)} min`],
    ["Preparation/admin", `${totals.preparationMinutes.toFixed(0)} min`],
    ["Post-processing", `${totals.postProcessingMinutes.toFixed(0)} min`],
    ["CAD design", `${totals.cadDesignMinutes.toFixed(0)} min`],
    ["Setup fee", money(totals.setupFee)],
    ["Subtotal", money(totals.subtotal)],
    ["Including failures", money(totals.withFailures)],
    ["Suggested price", money(totals.quoted)],
    ...(state.settings.vatEnabled ? [["VAT", money(totals.vat)]] : []),
    ["Quoted price", money(totals.totalDue), "highlight"],
  ];

  els.summaryStats.innerHTML = rows
    .map(([label, value, className]) => `<div class="stat-row ${className || ""}"><span>${label}</span><strong>${value}</strong></div>`)
    .join("");

  renderBreakdown(totals);
}

function refreshCalculatedViews() {
  document.querySelectorAll(".component-card").forEach((card) => {
    const component = state.components.find((item) => item.id === card.dataset.id);
    if (!component) return;
    const totals = calculateComponent(component);
    const setupFeeInput = card.querySelector(".setup-fee-input");
    if (setupFeeInput) setupFeeInput.value = formatCurrencyInput(state.settings.setupFee);
    card.querySelector(".subtotal-output").textContent = money(totals.subtotal);
    card.querySelector(".failure-output").textContent = money(totals.withFailures);
    card.querySelector(".quoted-output").textContent = money(totals.quoted);
  });
  renderSummary();
  saveState();
}

function renderBreakdown(totals) {
  const items = [
    ["Filament", totals.filament, costColors.filament],
    ["Electricity", totals.electricity, costColors.electricity],
    ["Printer depreciation", totals.depreciation, costColors.depreciation],
    ["Preparation", totals.preparation, costColors.preparation],
    ["Post-processing", totals.postProcessing, costColors.postProcessing],
    ["CAD design", totals.cadDesign, costColors.cadDesign],
    ["Setup fee", totals.setupFee, costColors.setupFee],
    ["Consumables", totals.consumables, costColors.consumables],
    ["Scrap", totals.scrap, costColors.scrap],
    ["Mark-up", totals.markup, costColors.markup],
  ];
  els.breakdownLegend.innerHTML = items
    .map(
      ([label, value, color]) => `
        <div class="legend-row">
          <span class="legend-name"><i class="swatch" style="background:${color}"></i>${label}</span>
          <strong>${money(value)}</strong>
        </div>`
    )
    .join("");
}

function renderCatalogs() {
  els.materialsTable.innerHTML = state.materials.map(materialRow).join("");
  els.printersTable.innerHTML = state.printers.map(printerRow).join("");
  bindCatalogInputs();
}

function materialRow(material) {
  return `
    <tr data-id="${material.id}" data-type="materials">
      <td><input data-key="name" value="${escapeHtml(material.name)}" /></td>
      <td><input data-key="type" value="${escapeHtml(material.type || "")}" placeholder="PLA" /></td>
      <td><input data-key="colour" value="${escapeHtml(material.colour || "")}" placeholder="Black" /></td>
      <td><input data-key="diameter" type="number" step="0.01" value="${material.diameter}" /></td>
      <td><input data-key="spoolPrice" data-currency="true" value="${formatCurrencyInput(material.spoolPrice)}" /></td>
      <td><input data-key="spoolKg" type="number" step="0.1" value="${material.spoolKg}" /></td>
      <td><button class="row-delete" type="button">×</button></td>
    </tr>`;
}

function printerRow(printer) {
  return `
    <tr data-id="${printer.id}" data-type="printers">
      <td><input data-key="name" value="${escapeHtml(printer.name)}" /></td>
      <td><input data-key="type" value="${escapeHtml(printer.type || "")}" placeholder="FDM" /></td>
      <td><input data-key="buildVolume" value="${escapeHtml(printer.buildVolume || "")}" placeholder="220x220x250 mm" /></td>
      <td><input data-key="ratedPower" value="${escapeHtml(printer.ratedPower || "")}" placeholder="0.350 kW" /></td>
      <td><input data-key="price" data-currency="true" value="${formatCurrencyInput(printer.price)}" /></td>
      <td><input data-key="depreciationHours" type="number" step="1" value="${printer.depreciationHours}" /></td>
      <td><input data-key="serviceCosts" data-currency="true" value="${formatCurrencyInput(printer.serviceCosts)}" /></td>
      <td><input class="depreciation-output" value="${formatCurrencyInput(printerDepreciationPerHour(printer))}" disabled /></td>
      <td><input data-key="energyConsumption" type="number" step="0.001" value="${printer.energyConsumption}" /></td>
      <td><button class="row-delete" type="button">×</button></td>
    </tr>`;
}

function bindCatalogInputs() {
  document.querySelectorAll("tbody input").forEach((input) => {
    input.addEventListener("input", () => {
      const row = input.closest("tr");
      const collection = state[row.dataset.type];
      const item = collection.find((entry) => entry.id === row.dataset.id);
      item[input.dataset.key] = input.dataset.currency ? parseCurrencyInput(input.value) : input.type === "number" ? num(input.value) : input.value;
      updateCatalogCalculatedFields(row, item);
      refreshQuoteSelectOptions();
      refreshCalculatedViews();
    });

    input.addEventListener("blur", () => {
      if (!input.dataset.currency) return;
      input.value = formatCurrencyInput(parseCurrencyInput(input.value));
    });
  });

  document.querySelectorAll(".row-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const row = button.closest("tr");
      const type = row.dataset.type;
      state[type] = state[type].filter((item) => item.id !== row.dataset.id);
      const fallback = state[type][0]?.id;
      if (type === "materials") state.components.forEach((item) => { if (item.materialId === row.dataset.id) item.materialId = fallback; });
      if (type === "printers") state.components.forEach((item) => { if (item.printerId === row.dataset.id) item.printerId = fallback; });
      render();
    });
  });
}

function updateCatalogCalculatedFields(row, item) {
  if (row.dataset.type !== "printers") return;
  const depreciationOutput = row.querySelector(".depreciation-output");
  if (depreciationOutput) depreciationOutput.value = formatCurrencyInput(printerDepreciationPerHour(item));
}

function renderSettings() {
  els.energyCostInput.value = formatCurrencyInput(state.settings.energyCost);
  els.laborCostInput.value = formatCurrencyInput(state.settings.laborCost);
  els.cadCostInput.value = formatCurrencyInput(state.settings.cadCost);
  els.failureRateInput.value = state.settings.failureRate;
  els.defaultMarkupInput.value = state.settings.defaultMarkup;
  els.setupFeeInput.value = formatCurrencyInput(state.settings.setupFee);
  els.supplierNameInput.value = state.settings.supplierName || "";
  els.supplierEmailInput.value = state.settings.supplierEmail || "";
  els.supplierPhoneInput.value = state.settings.supplierPhone || "";
  els.supplierAddressInput.value = state.settings.supplierAddress || "";
  els.supplierNotesInput.value = state.settings.supplierNotes || "";
  els.bankingDetailsInput.value = state.settings.bankingDetails || "";
  els.vatEnabledInput.value = state.settings.vatEnabled ? "yes" : "no";
  els.vatRateInput.value = state.settings.vatRate;
  els.vatNumberInput.value = state.settings.vatNumber || "";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function formatCurrencyInput(value) {
  return `R${num(value).toFixed(2)}`;
}

function parseCurrencyInput(value) {
  return num(String(value).replace(/[^\d.-]/g, ""));
}

function nl2br(value) {
  return escapeHtml(value || "").replace(/\n/g, "<br>");
}

function documentTitle() {
  return state.quote.documentType === "invoice" ? "Invoice" : "Quote / Estimate";
}

function buildPrintDocument() {
  const totals = calculateTotals();
  const printRunningCost = totals.filament + totals.electricity + totals.depreciation + totals.consumables;
  const labourCost = totals.preparation + totals.postProcessing;
  const lineItems = [
    {
      item: "Print time, material and machine use",
      details: `${totals.printHours.toFixed(2)} print hours / ${totals.weight.toFixed(1)} g material`,
      amount: printRunningCost,
    },
    {
      item: "Active labour",
      details: `${totals.totalLabourMinutes.toFixed(0)} minutes preparation, setup, removal and admin`,
      amount: labourCost,
    },
  ];

  if (totals.cadDesign > 0 || totals.cadDesignMinutes > 0) {
    lineItems.push({
      item: "CAD design",
      details: `${totals.cadDesignMinutes.toFixed(0)} minutes CAD/model work`,
      amount: totals.cadDesign,
    });
  }

  if (totals.setupFee > 0) {
    lineItems.push({
      item: "Setup fee",
      details: `Applied per component across ${state.components.length} part${state.components.length === 1 ? "" : "s"}`,
      amount: totals.setupFee,
    });
  }

  const documentNumber = state.quote.documentNumber || `${state.quote.documentType === "invoice" ? "INV" : "QUOTE"}-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`;

  els.printDocument.innerHTML = `
    <div class="print-header">
      <div>
        <h1>${escapeHtml(documentTitle())}</h1>
        <div class="print-meta">
          <strong>${escapeHtml(documentNumber)}</strong><br>
          Date: ${escapeHtml(state.quote.date || "")}
        </div>
      </div>
      <div class="print-party print-number">
        <strong>${escapeHtml(state.settings.supplierName || "Supplier")}</strong><br>
        ${escapeHtml(state.settings.supplierEmail || "")}<br>
        ${escapeHtml(state.settings.supplierPhone || "")}<br>
        ${state.settings.vatNumber ? `VAT: ${escapeHtml(state.settings.vatNumber)}<br>` : ""}
        ${nl2br(state.settings.supplierAddress || "")}
      </div>
    </div>

    <div class="print-parties">
      <div class="print-party">
        <h2>Client</h2>
        <strong>${escapeHtml(state.quote.customer || "Client")}</strong><br>
        ${escapeHtml(state.quote.clientEmail || "")}<br>
        ${escapeHtml(state.quote.clientPhone || "")}<br>
        ${nl2br(state.quote.clientAddress || "")}
      </div>
      <div class="print-party">
        <h2>Job</h2>
        ${nl2br(state.quote.description || "3D printing job")}
        ${state.quote.jobNotes ? `<br><br><strong>Job notes:</strong><br>${nl2br(state.quote.jobNotes)}` : ""}
      </div>
    </div>

    <div class="print-items">
      <h2>Items</h2>
      <table>
        <thead>
          <tr>
            <th>Line item</th>
            <th>Details</th>
            <th class="print-number">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${lineItems
            .map((item) => {
              return `
                <tr>
                  <td>${escapeHtml(item.item)}</td>
                  <td>${escapeHtml(item.details)}</td>
                  <td class="print-number">${money(item.amount)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="print-total">
      <div class="print-total-row"><span>Subtotal</span><strong>${money(totals.subtotal)}</strong></div>
      <div class="print-total-row"><span>Failure allowance</span><strong>${money(totals.scrap)}</strong></div>
      <div class="print-total-row"><span>Markup</span><strong>${money(totals.markup)}</strong></div>
      ${state.settings.vatEnabled ? `<div class="print-total-row"><span>VAT (${num(state.settings.vatRate)}%)</span><strong>${money(totals.vat)}</strong></div>` : ""}
      <div class="print-total-row final"><span>Total</span><strong>${money(totals.totalDue)}</strong></div>
    </div>

    ${state.settings.bankingDetails ? `<div class="print-notes"><h2>Banking Details</h2>${nl2br(state.settings.bankingDetails)}</div>` : ""}
    ${state.settings.supplierNotes ? `<div class="print-notes"><h2>Notes</h2>${nl2br(state.settings.supplierNotes)}</div>` : ""}
  `;
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createBlankComponent(name = "COMPONENT 1", options = {}) {
  const useLabourDefaults = options.useLabourDefaults ?? true;
  const useSetupSelections = options.useSetupSelections ?? true;
  const useDefaultMarkup = options.useDefaultMarkup ?? true;
  return {
    id: makeId("part"),
    name,
    printerId: useSetupSelections ? state.printers[0]?.id || "" : "",
    materialId: useSetupSelections ? state.materials[0]?.id || "" : "",
    weight: 0,
    printHours: 0,
    prep: useLabourDefaults ? 15 : 0,
    slice: useLabourDefaults ? 10 : 0,
    transfer: useLabourDefaults ? 5 : 0,
    jobRemoval: useLabourDefaults ? 5 : 0,
    supportRemoval: 0,
    materialChange: 0,
    additionalWork: 0,
    adminCommunication: useLabourDefaults ? 5 : 0,
    cadDesign: 0,
    consumables: 0,
    markup: num(state.settings.defaultMarkup),
    setupFee: num(state.settings.setupFee),
    gcodeFileName: "",
    gcodeImportSummary: "",
    gcodeFile: null,
  };
}

els.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    els.tabs.forEach((item) => item.classList.toggle("active", item === tab));
    els.views.forEach((view) => view.classList.toggle("active", view.id === `${tab.dataset.view}View`));
  });
});

els.customerInput.addEventListener("input", () => {
  state.quote.customer = els.customerInput.value;
  saveState();
});
els.documentTypeInput.addEventListener("input", () => {
  state.quote.documentType = els.documentTypeInput.value;
  saveState();
});
els.documentNumberInput.addEventListener("input", () => {
  state.quote.documentNumber = els.documentNumberInput.value;
  saveState();
});
els.clientEmailInput.addEventListener("input", () => {
  state.quote.clientEmail = els.clientEmailInput.value;
  saveState();
});
els.clientPhoneInput.addEventListener("input", () => {
  state.quote.clientPhone = els.clientPhoneInput.value;
  saveState();
});
els.clientAddressInput.addEventListener("input", () => {
  state.quote.clientAddress = els.clientAddressInput.value;
  saveState();
});
els.dateInput.addEventListener("input", () => {
  state.quote.date = els.dateInput.value;
  saveState();
});

[
  ["supplierNameInput", "supplierName"],
  ["supplierEmailInput", "supplierEmail"],
  ["supplierPhoneInput", "supplierPhone"],
  ["supplierAddressInput", "supplierAddress"],
  ["supplierNotesInput", "supplierNotes"],
  ["bankingDetailsInput", "bankingDetails"],
  ["vatNumberInput", "vatNumber"],
].forEach(([elementKey, stateKey]) => {
  els[elementKey].addEventListener("input", () => {
    state.settings[stateKey] = els[elementKey].value;
    saveState();
  });
});

els.vatEnabledInput.addEventListener("input", () => {
  state.settings.vatEnabled = els.vatEnabledInput.value === "yes";
  refreshCalculatedViews();
});

els.vatRateInput.addEventListener("input", () => {
  state.settings.vatRate = num(els.vatRateInput.value);
  refreshCalculatedViews();
});
els.descriptionInput.addEventListener("input", () => {
  state.quote.description = els.descriptionInput.value;
  saveState();
});

els.jobNotesInput.addEventListener("input", () => {
  state.quote.jobNotes = els.jobNotesInput.value;
  saveState();
});

els.exportPdfBtn.addEventListener("click", () => {
  buildPrintDocument();
  window.print();
});

[
  ["energyCostInput", "energyCost"],
  ["laborCostInput", "laborCost"],
  ["cadCostInput", "cadCost"],
  ["failureRateInput", "failureRate"],
  ["defaultMarkupInput", "defaultMarkup"],
  ["setupFeeInput", "setupFee"],
].forEach(([elementKey, stateKey]) => {
  els[elementKey].addEventListener("input", () => {
    state.settings[stateKey] = ["energyCost", "laborCost", "cadCost", "setupFee"].includes(stateKey) ? parseCurrencyInput(els[elementKey].value) : num(els[elementKey].value);
    if (stateKey === "defaultMarkup") {
      state.components.forEach((component) => {
        component.markup = state.settings.defaultMarkup;
      });
    }
    if (stateKey === "setupFee") state.components.forEach((component) => { component.setupFee = state.settings.setupFee; });
    refreshCalculatedViews();
  });

  els[elementKey].addEventListener("blur", () => {
    if (!["energyCost", "laborCost", "cadCost", "setupFee"].includes(stateKey)) return;
    els[elementKey].value = formatCurrencyInput(state.settings[stateKey]);
  });
});

els.addComponentBtn.addEventListener("click", () => {
  state.components.push(createBlankComponent(`COMPONENT ${state.components.length + 1}`));
  render();
});

els.addMaterialBtn.addEventListener("click", () => {
  state.materials.push({
    id: makeId("mat"),
    name: "New material",
    type: "",
    colour: "",
    diameter: 0,
    spoolPrice: 0,
    spoolKg: 0,
    density: 0,
    nozzleTemp: 0,
    bedTemp: 0,
  });
  state.components.forEach((component) => {
    if (!component.materialId) component.materialId = state.materials[state.materials.length - 1].id;
  });
  render();
});

els.addPrinterBtn.addEventListener("click", () => {
  openPrinterModal();
});

els.toastCloseBtn.addEventListener("click", () => {
  els.toast.hidden = true;
});

els.serviceCostHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Service cost</strong>
    Estimate the maintenance you expect over the printer's useful life: nozzles, build plates, belts, fans, hotend or extruder parts, resin films/screens, and repairs. The app uses (printer price + service cost) / life hours. If Life h is 0, depreciation stays R0.00.
  `, els.serviceCostHelpBtn);
});

els.energyCostHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Energy cost</strong>
    This is the Rand cost for 1 kWh of electricity. As of June 2026 in South Africa, tariffs vary by municipality, prepaid/block tariff, VAT, and whether the customer buys directly from Eskom. R3.50/kWh is used as a practical editable planning estimate for community quoting: it is above the national FBE benchmark rate of about R2.38/kWh and allows for municipal retail markups after the 2026/27 Eskom/NERSA tariff increases. For best accuracy, use the R/kWh shown on your own electricity bill or prepaid purchase.
  `, els.energyCostHelpBtn);
});

els.laborCostHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Labor cost</strong>
    This is your hourly rate for active human work, not passive print time. The app applies it only to labour fields such as preparation, slicing, printer setup/start, job removal, support removal, material changes, additional work, and admin/communication.
  `, els.laborCostHelpBtn);
});

els.cadCostHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>CAD design cost</strong>
    This is the hourly rate for optional design/model work such as creating a part, modifying a model, repairing files, adding text/logos, or preparing customer geometry. It only affects a quote when CAD design minutes are entered on the quote card.
  `, els.cadCostHelpBtn);
});

els.failureRateHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Failure rate</strong>
    This adds an allowance for failed prints, wasted material, lost electricity, machine time, and rework. For example, a 10% failure rate adds 10% to the calculated subtotal before markup. Use a lower value if your process is very reliable, or a higher value for risky/complex jobs.
  `, els.failureRateHelpBtn);
});

els.lifeHoursHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Life hours</strong>
    Enter the estimated number of printing hours you expect from the machine before it is effectively paid off or replaced. Depreciation is calculated as (printer price + service cost) / life hours, so this must be greater than 0 to add printer depreciation to quotes.
  `, els.lifeHoursHelpBtn);
});

els.depreciationHelpBtn.addEventListener("click", () => {
  showToast(`
    <strong>Depreciation R/h</strong>
    This is the printer running cost added for every print hour. The app calculates it as (printer price + service cost) / life hours, then multiplies that hourly amount by the component's print time.
  `, els.depreciationHelpBtn);
});

els.closePrinterModalBtn.addEventListener("click", closePrinterModal);

els.printerModal.addEventListener("click", (event) => {
  if (event.target === els.printerModal) closePrinterModal();
});

els.printerBrandSelect.addEventListener("change", renderPrinterModalModels);
els.printerModelSelect.addEventListener("change", renderPrinterPresetPreview);

els.confirmPrinterPresetBtn.addEventListener("click", () => {
  const preset = selectedPrinterPreset();
  if (!preset) return;
  addPrinterFromData({
    ...preset,
    name: `${els.printerBrandSelect.value} ${preset.name}`,
  });
});

els.addCustomPrinterBtn.addEventListener("click", () => {
  addPrinterFromData({
    name: "Custom printer",
    type: "",
    buildVolume: "",
    ratedPower: "",
    energyConsumption: 0,
  });
});

els.resetBtn.addEventListener("click", () => {
  if (!confirm("Reset the current quote form?")) return;
  state.quote = {
    documentType: "quote",
    documentNumber: "",
    customer: "",
    clientEmail: "",
    clientPhone: "",
    clientAddress: "",
    date: new Date().toISOString().slice(0, 10),
    description: "",
    jobNotes: "",
  };
  state.components = [
    createBlankComponent("COMPONENT 1", {
      useLabourDefaults: false,
      useSetupSelections: false,
      useDefaultMarkup: true,
    }),
  ];
  render();
  saveState();
});

render();
