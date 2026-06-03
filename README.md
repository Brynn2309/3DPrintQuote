# 3D Print Pricing Guide

A free browser-based quoting tool for 3D printing jobs.

The app helps makers and small print farms create more consistent quotes or invoices without relying on a spreadsheet.

## Features

- Create a quote/estimate or invoice
- Add client details and job notes
- Add your own printers
- Add your own filament/materials
- Use built-in printer presets for common FDM and resin printers
- Upload g-code and apply print time / filament usage where available
- Calculate:
  - Filament/material cost
  - Electricity cost
  - Printer depreciation
  - Active labour
  - CAD design work
  - Consumables
  - Per-component setup fee
  - Failure allowance
  - Markup
  - VAT, if enabled
- Add business details, VAT info, banking details, and payment/quote notes
- Export or print the quote/invoice to PDF
- Saves setup locally in the browser

## How To Use

Open `index.html` in a browser.

No build step or server is required for the current version.

## Data Storage

The app currently saves data in browser `localStorage`.

That means:

- Your setup should remain available when you return using the same browser and device.
- Data does not automatically sync between devices.
- Clearing browser/site data will remove saved setup and quote data.
- G-code file contents are not permanently stored by the app.

## G-code Import

The app can read common slicer metadata from uploaded g-code files, including values such as:

- Filament used in grams
- Filament used in millimetres
- Estimated print time

Support depends on what metadata your slicer includes in the g-code.

## Contributing

This is a community-friendly project. Feel free to fork it, test it, suggest improvements, or open issues/PRs.

Useful areas for improvement:

- More printer presets
- More slicer/g-code metadata support
- Better mobile layout testing
- Saved quote history
- Import/export backups
- Cloud sync or accounts
- Improved PDF layouts

## Notes

This tool is intended as a quoting aid. Always check that your own rates, material costs, electricity costs, labour rate, VAT settings, and business details are correct before sending a quote or invoice.
