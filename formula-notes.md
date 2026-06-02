# Original Excel Formula Notes

Source workbook: `Master 3D Quote 20191016.xlsx`

## General

- Energy cost: `General!B2`
- Labor cost per hour: `General!B3`
- Failure rate percentage: `General!B4`
- Currency symbol: `General!B5`

## Materials

Original material columns:

- Manufacturer
- Diameter in mm
- Spool price
- Spool size in kg
- Density in g/cm3
- Nozzle temp
- Bed temp
- Length per roll
- Price per kg
- Price per g
- Price per m
- Factor from metres to grams

Important formulas:

- Length per roll: `spoolKg / density * 4 / (PI() * (diameterCm ^ 2)) / 10`
- Price per kg: `spoolPrice / spoolKg`
- Price per g: `pricePerKg / 1000`
- Price per m: `pricePerKg / lengthPerRoll`
- Metres from grams: `lengthPerRoll / (spoolKg * 1000)`

The app currently prices filament from grams:

```text
filamentCost = weightGrams * (materialCost / (spoolKg * 1000))
```

## Printers

Original printer columns:

- Name
- Material diameter
- Price
- Depreciation time in hours
- Service costs per life
- Energy consumption in kWh/h
- Depreciation in R/h

Important formula:

```text
depreciationPerHour = (printerPrice + serviceCosts) / depreciationHours
```

## Component Costs

For each component:

```text
filament = weightGrams / 1000 * materialPricePerKg
electricity = printHours * printerEnergyConsumption * energyCost
printerDepreciation = printHours * printerDepreciationPerHour
preparation = preparationMinutes / 60 * laborCost
postProcessing = postProcessingMinutes / 60 * laborCost
consumables = enteredConsumables
subtotal = filament + electricity + printerDepreciation + preparation + postProcessing + consumables
scrap = subtotal * failureRatePercent
includingFailures = subtotal + scrap
markup = includingFailures * markupPercent
suggestedPrice = includingFailures + markup
quotedPrice = rounded or manually entered quote price
```

The workbook allows up to six components and sums matching rows across all components for the summary and chart.
