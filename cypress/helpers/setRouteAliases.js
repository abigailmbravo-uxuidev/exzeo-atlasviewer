export const setRouteAliases = () =>
  cy
    .server()
    .route({
      method: 'GET',
      url: 'https://api.mapbox.com/v4/**'
    })
    .as('applyLayer')
    .route({
      method: 'GET',
      url: 'https://api.mapbox.com/styles/v1/exzeo/**'
    })
    .as('addBaseMap')
    .route({
      method: 'GET',
      url: 'https://api-stage.atlasviewer.com/api/userdata'
    })
    .as('getUserData')
    .route({
      method: 'POST',
      url: 'https://api-stage.atlasviewer.com/api/upload'
    })
    .as('uploadFeed')
    .route({
      method: 'GET',
      url: 'https://api-stage.atlasviewer.com/api/geojson/**'
    })
    .as('mapTheFeed')
    .route({
      method: 'DELETE',
      url: 'https://api-stage.atlasviewer.com/api/delete/**'
    })
    .as('deleteTheFeed')
    .route({
      method: 'GET',
      url: 'https://api-stage.atlasviewer.com/api/shares/***'
    })
    .as('shareFeedModal')
    .route({
      method: 'POST',
      url: 'https://api-stage.atlasviewer.com/api/share'
    })
    .as('shareFeed')
    .route({
      method: 'DELETE',
      url: 'https://api-stage.atlasviewer.com/api/share/delete/**'
    })
    .as('revokeFeed')
