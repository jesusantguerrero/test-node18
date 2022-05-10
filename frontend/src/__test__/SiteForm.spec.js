import { render, screen } from "@testing-library/react";
import SiteForm from "../components/organisms/SiteForm";

test('Load and display site form', () => {
    const site = {
        
    }

    const handleChange = jest.fn();
    const handleSubmit = jest.fn();

    render(<SiteForm  onSubmit={handleSubmit} onChange={handleChange} site={site} />);
    screen.getByText('Title')
    screen.getByText('URL')
    screen.getByText('Selector')
    screen.getByText('Selector')
    screen.getByText('Action')
    screen.getByText('Value')
    screen.getByText('Index')
})