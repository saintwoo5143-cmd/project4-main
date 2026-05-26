import React, { useState } from 'react'
import CreateForm from '../components/CreateForm'

function Create({ onCreate }) {
    return(
        <>
            <CreateForm onAddBook={onCreate} />
        </>
    );
}

export default Create
