import React from 'react'
import { Grid, Card, Typography } from '@material-ui/core'

function Friend({friend:{name,age,email}}) {
    return (
        <Grid item xs={3}>
            <Card>
                <Typography variant='h5'>
                    {name}
                </Typography>
                <Typography variant='h6'>
                    Age:{age}
                </Typography>
                <Typography>
                    Email:{email}
                </Typography>
            </Card>
        </Grid>
    )
}

export default Friend
