import { render, screen } from "@testing-library/react";
import { beforeEach, describe } from "vitest";
import SiteForm from "../components/SiteForm.jsx";

describe('Site Form', () => {
    
    beforeEach(() => {
        const site = {}
        const handleChange = jest.fn();
        const handleSubmit = jest.fn();
        render(<SiteForm onSubmit={handleSubmit} onChange={handleChange} site={site} />); 
    })

    test('Load and display site form', () => {
        screen.getByText('Sites')
    })
})