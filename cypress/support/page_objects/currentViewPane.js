export class currentViewPane {
  verifyThatFeedPresentOnCurrentViewPane(name) {
    cy.get('#view')
      .should('have.class', 'panel open')
      .get('[data-tip="' + name + '"]' )     
  }

  verifyThatFeedIsAddedtoMap(name) {
    cy.get('#view')
      .find('.panel-list').contains(name).parents('span').siblings('span')
      .find('svg')
      .first()
      .should('have.attr', 'data-icon', 'eye');
  }

  clickToOpenLegend() {
    cy.get('.icon-popOut').click();
  }

  verifyThatLayerPresentAndHasCorrectName() {
    cy.get("[data-tip='Flood Hazard Area - Hillsborough']");
  }

  verifyThatLayerIsDisplayedOnMap() {
    cy.get('label[for="layer"]')
      .siblings('.panel-list')
      .find('[data-icon]')
      .first()
      .should('have.attr', 'data-icon', 'eye');
  }

  verifyBaseMapLayer() {
    cy.get('select')
      .eq(1)
      .select('Terrain');
    cy.wait('@addBaseMap').then(data => {
      expect(data.response.body.name).to.be.eq('Terrain Basemap');
    });
  }
  
}

export const onCurrentViewPane = new currentViewPane();
