export class layersSection {
  openLayersList() {
    cy.get('.paneToggle')
      .eq(1)
      .click();
  }

  checkLayer() {
    cy.get('.panel-list')
      .eq(1)
      .find('input')
      .first()
      .click();
    cy.wait('@applyLayer').then(text => {
      expect(text.response.body.name).to.include('flood-hazard-area');
      cy.log(text.xhr.status)
    });
  }
}

export const onLayersSection = new layersSection();
