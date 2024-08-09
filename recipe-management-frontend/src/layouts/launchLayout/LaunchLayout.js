import React from 'react'
import { useOutlet } from 'react-router-dom'

const LaunchLayout = () => {
    const outlet = useOutlet();
    return (
        <div>
            <main>
                {outlet}
            </main>
        </div>
    )
}

export default LaunchLayout;