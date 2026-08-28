import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Replace HeroSection call
old_hero = """        {/* Hero Section with Fast Lead Capture Form */}
        <HeroSection
          settings={settings}
          preselectedSector={preselectedSector}
          onSubmitLead={handleAddLead}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />"""

new_hero = """        {/* Hero Section */}
        <HeroSection settings={settings} />"""

content = content.replace(old_hero, new_hero)

# Insert LeadCaptureForm below SectorGrid
old_grid = """        <SectorGrid
          sectors={SECTORS_DATA}
          onSelectSector={handleSelectSector}
        />"""

new_grid = """        <SectorGrid
          sectors={SECTORS_DATA}
          onSelectSector={handleSelectSector}
        />

        {/* Lead Capture Form moved below SectorGrid */}
        <LeadCaptureForm
          settings={settings}
          preselectedSector={preselectedSector}
          onSubmitLead={handleAddLead}
          onOpenCalculator={() => setIsCalculatorOpen(true)}
        />"""

content = content.replace(old_grid, new_grid)

with open('src/App.tsx', 'w') as f:
    f.write(content)
