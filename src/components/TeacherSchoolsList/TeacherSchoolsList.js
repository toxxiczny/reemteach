import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { compose } from 'redux'
import { withMenu } from '@hoc'

import APDashboard from '@components/AdminProfile/styled/Dashboard'
import AHTLDashboard from '@components/AdminHeadTeachersList/styled/Dashboard'

import HTPComposed from '@components/HeadTeacherProfile/composed'

import { delayedApiAxios } from '@utils'

const TeacherSchoolsListContainer = styled(APDashboard.Container)`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const TeacherSchoolsList = ({ shouldMenuAppear }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [schools, setSchools] = useState([])
    useEffect(() => {
        const getSchools = async () => {
            const url = '/api/teacher/getSchools'
            const response = await delayedApiAxios.get(url)
            if (response) {
                setIsLoading(false)
                const { schools } = response.data
                setSchools(schools)
            }
        }
        getSchools()
    }, [])
    return (
        <TeacherSchoolsListContainer withMenu={shouldMenuAppear}>
            {!isLoading && (
                <AHTLDashboard.DetailsContainer>
                    {schools.length > 0 ? (
                        schools.map(
                            ({
                                id,
                                name: schoolName,
                                type,
                                description,
                                address,
                                creationYear,
                                headTeacher: { email, name, surname }
                            }) => {
                                return (
                                    <div key={id}>
                                        <HTPComposed.Detail
                                            label="Nazwa szkoły"
                                            value={schoolName}
                                        />
                                        <HTPComposed.Detail
                                            label="Dyrektor"
                                            value={`${name} ${surname}`}
                                        />
                                        <HTPComposed.Detail label="E-mail" value={email} />
                                        <HTPComposed.Detail label="Rodzaj szkoły" value={type} />
                                        <HTPComposed.Detail
                                            label="Opis szkoły"
                                            value={description}
                                        />
                                        <HTPComposed.Detail label="Adres szkoły" value={address} />
                                        <HTPComposed.Detail
                                            label="Rok utworzenia szkoły"
                                            value={creationYear}
                                        />
                                    </div>
                                )
                            }
                        )
                    ) : (
                        <AHTLDashboard.Warning>
                            Nie należysz do żadnej szkoły!
                        </AHTLDashboard.Warning>
                    )}
                </AHTLDashboard.DetailsContainer>
            )}
        </TeacherSchoolsListContainer>
    )
}

export default compose(withMenu)(TeacherSchoolsList)
