export const boxBackGround ={
    backgroundColor: "white",
    borderRadius:"20px",
    width:"80%",
    minHeight:"113px",
    marginTop:2
}

export const todoListText={
    fontWeight:700,
    fontSize:"18px",
    lineHeight:"20.7px",
    letterSpacing:"-2%",
    padding:2
}

export const colorButton ={
    color:"black",
    marginTop:1
}

export const direction = {
    display:"flex",
    flexDirection:"row"
}

export const separateItems={
    display:"flex",
    justifyContent:"space-between"
}

export const selectStyled={
    marginRight:1,
}

export const menuPropsSelectStyled={
    PaperProps: {
        sx: {
           borderRadius:5,
           width:"200px",
           "&& .Mui-selected": {
              color:(theme:any) => theme.palette.primary.main,
            },
          '& .MuiMenuItem-root': {
            padding: 2,
            color: 'black',
          },
        },
      },
}

export const checkBoxStyled={
    paddingLeft:2,
}

export const listDirectionColumn={
    display:"flex",
    flexDirection:"column"
}

export const directionItemsList={
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
}

export const styledTypo={
    marginTop:"7px",
    fontSize:"14px",
    lineHeight:"30px",
    fontWeight:700,
    color:"#5E5E5E",
    marginRight:4,
    textDecoration:"underline #5E5E5E"
}