# Qmesh

A viewer for the 3D Tiles format Quantizied Mesh Tiles, used by among others Cesium.js

# Decoding 3D Tiles
This project was first made as an attempt to decode 3D Tiles manually, which is pretty much the only thing the 1st version does. Now I will start over and create a Redux-React app out of it.

# Redux app
I haven't really looked at Redux-based apps since it took off in 2016, but have always wanted to do so. Therefore I decided to have a go at it in the context of this very simple application. I will be following [this Medium blog post](https://medium.com/@rajaraodv/step-by-step-guide-to-building-react-redux-apps-using-mocks-48ca0f47f9a).

This blog post of course doesn't deal with requests and all those async problems we run into in those situations, so we will try to mock it up first, then add some middleware to handle actual request calls later on.


# Creating a React-Redux app
The blog post mentioned above breaks down the development process into specific steps which I find to be very informative when learning a new topic.



## Step 1: Write a detailed mock of the Screen
```

    -------------------------------------------------------------
    |  inputs   ------------------------------                  |
    |  xxx      |                            |     Tile list    |
    |  yyy      |                            |     Tile 1  x    |
    |  zzz      |        Tiles in 3D         |     Tile 2  x    |
    |           |                            |     Tile 3  x    |
    | Add tile  |                            |                  |
    | Clear all |                            |                  |
    |           |                            |                  |
    |           ------------------------------                  |
    |                                                           |
    -------------------------------------------------------------
```


A pretty detailed ascii version of my app: 
- x, y, z input fields
- add button
- clear button
- a tile viwer, visualizing all the tiles
- a tile list with the tile names

## Step 2: Divide the app into components

We have got the following components:
- Add a new tile (AddTile)
- Clear all tiles (ClearTiles)
- Show tiles in a Three.js view (TileViewer)
- Show tiles in a list, can remove tiles (TileList) 


## Step 3: List state and actions for each component

### 3.1 AddTile
State:
N/A - simple fields with no connection to state

Actions: 
```
-   type: "ADD_TILE"
    payload: 
        x: double
        y: double
        z: double
```

### 3.2 ClearTiles
State:
N/A - although it will affect the Tiles array, it does not need it

Actions:
```
-   type: "CLEAR_ALL"
    payload: None
```

### 3.3 TileViewer
State: 
- Tiles array

Actions:
N/A - for now we won't bother with controls and state in the view

### 3.4 TileList
State: 
- Tiles array

Actions:
```
-  type: "REMOVE_TILE"
```

## Step 4: Create action creators for each action

1. ADD_TILE - takes in an id, x, y and z

2. CLEAR_ALL - deletes all in list

3. REMOVE_TILE - takes in an id, removes corresponding tile from list

## Step 5: Write reducers for each action

To begin with we only have one reducer; the tile reducer. It reduces based on the actions listed above, for which it does pretty much what you would expect. Remove tile as follows:

```

const tile = (state, action) => {
  switch (action.type) {

    case "REMOVE_TILE": 
        let index = state.findIndex((x) => x.id === n); 
        return [
            ...list.slice(0, index),
            ...list.slice(index + 1)
        ]
  }
  
}
```

## Step 6: Implement every presentational component
In order to separate React and Redux logic it is recommended to divide components into two groups based on whether or not they've got presentational or data event related components; presentational and container components, respectively.


Presentational components: Handles presentation of data, for instance our Three.js view or the Listview

Container components: Wraps the presentational components and handles action dispatching and other Redux-related logic. This container component passes data to the presentational component.


## Step 7: 
