export class legendPopUp {
  verifyThatLegendHasCorrectFeedName(name) {
    cy.get("[data-for='feedPopOverTooltip']").should('have.text', name);
  }

  verifyThatLegendIsDraggable() {
    cy.get('#popout').find('div').first().invoke('attr' , 'transform').then( transform => {
      cy.get('.gripper').trigger('mousedown');
      cy.get('.gripper').trigger('mousemove', { clientX: 1600, clientY: 300 });
      cy.get('.gripper').trigger('mouseup');
      cy.get('#popout')
      .find('div')
      .first()
      .should('not.have.css', 'transform', transform);
    })   
  }

  closeTheLegendAndVerifyThatItClosed() {
    cy.get('.iconBtn').click();
    cy.get('.gripper').should('not.exist');
  }
}

export const onLegendPopUp = new legendPopUp();
