// src/components/ComponentExplorer.tsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Heading, 
  Text, 
  Stack, 
  Spinner, 
  Alert, 
  AlertIcon, 
  List, 
  ListItem,
  Divider
} from '@webflow/designer-extension-ui';

interface ComponentInfo {
  id: string;
  name?: string;
  details?: any;
}

const ComponentExplorer: React.FC = () => {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<ComponentInfo | null>(null);
  const [enteringComponent, setEnteringComponent] = useState<boolean>(false);

  // Load components on initial render
  useEffect(() => {
    fetchComponents();
  }, []);

  // Fetch all components from the Webflow Designer API
  const fetchComponents = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get all components from the Webflow Designer API
      const allComponents = await webflow.getAllComponents();
      
      // Initial component data with just IDs
      const componentData: ComponentInfo[] = allComponents.map(component => ({
        id: component.id
      }));
      
      // Fetch names for each component
      const componentsWithNames = await Promise.all(
        componentData.map(async (component) => {
          try {
            // Use the component object to call getName
            const componentObj = allComponents.find(c => c.id === component.id);
            if (componentObj) {
              const name = await componentObj.getName();
              return { ...component, name };
            }
            return component;
          } catch (err) {
            console.error(`Error fetching name for component ${component.id}:`, err);
            return component;
          }
        })
      );
      
      setComponents(componentsWithNames);
    } catch (err) {
      console.error('Error fetching components:', err);
      setError('Failed to load components. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Get additional details for a component
  const getComponentDetails = async (component: ComponentInfo) => {
    setSelectedComponent({ ...component, details: 'Loading details...' });
    
    try {
      // Find the component object in the original list
      const allComponents = await webflow.getAllComponents();
      const componentObj = allComponents.find(c => c.id === component.id);
      
      if (!componentObj) {
        throw new Error('Component not found');
      }
      
      // Get root element of the component to include in details
      const rootElement = await componentObj.getRootElement();
      
      const details = {
        id: component.id,
        name: component.name || 'Unnamed Component',
        rootElement: rootElement ? {
          id: rootElement.id,
          type: rootElement.type
        } : 'No root element found'
      };
      
      setSelectedComponent({ ...component, details });
    } catch (err) {
      console.error('Error fetching component details:', err);
      setSelectedComponent({ 
        ...component, 
        details: 'Error loading details. Please try again.' 
      });
    }
  };

  // Enter a component using Webflow Designer API
  const handleEnterComponent = async (component: ComponentInfo) => {
    setEnteringComponent(true);
    
    try {
      // To enter a component, we need an instance of the component on the page
      // We'll need to handle the case where no instances exist
      
      // Get all elements to find component instances
      const allElements = await webflow.getAllElements();
      
      // Find a component instance with the matching component ID
      const componentInstance = allElements.find(element => 
        element.type === 'ComponentInstance' && 
        // We'd need to check if the instance is for our component
        // This might require getting the component from the instance
        element
      );
      
      if (!componentInstance) {
        throw new Error('No instances of this component found on the current page');
      }
      
      // Enter the component
      await webflow.enterComponent(componentInstance);
      setSelectedComponent(null); // Clear selection after entering
    } catch (err) {
      console.error('Error entering component:', err);
      setError(`Failed to enter component: ${err.message}`);
    } finally {
      setEnteringComponent(false);
    }
  };

  // Render loading state
  if (loading && components.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="200px">
        <Spinner size="lg" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Stack spacing={4}>
        <Heading size="md">Component Explorer</Heading>
        
        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}
        
        <Button 
          onClick={fetchComponents} 
          size="sm" 
          isLoading={loading}
          disabled={loading}
        >
          Refresh Components
        </Button>
        
        <Box display="flex">
          {/* Component List */}
          <Box width="50%" pr={2}>
            <Heading size="sm" mb={2}>Components ({components.length})</Heading>
            
            {components.length === 0 && !loading ? (
              <Text>No components found in this project.</Text>
            ) : (
              <List spacing={2}>
                {components.map((component) => (
                  <ListItem 
                    key={component.id}
                    p={2}
                    cursor="pointer"
                    borderWidth={1}
                    borderRadius="md"
                    borderColor={selectedComponent?.id === component.id ? "blue.500" : "gray.200"}
                    _hover={{ bg: "gray.50" }}
                    onClick={() => getComponentDetails(component)}
                  >
                    <Text fontWeight="medium">{component.name || 'Unnamed Component'}</Text>
                    <Text fontSize="xs" color="gray.500">ID: {component.id}</Text>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          
          {/* Component Details */}
          <Box width="50%" pl={2} borderLeftWidth={1} borderColor="gray.200">
            <Heading size="sm" mb={2}>Component Details</Heading>
            
            {selectedComponent ? (
              <Box>
                <Heading size="xs" mb={1}>{selectedComponent.name || 'Unnamed Component'}</Heading>
                <Text fontSize="xs" mb={3}>ID: {selectedComponent.id}</Text>
                
                <Divider my={2} />
                
                {typeof selectedComponent.details === 'string' ? (
                  <Text>{selectedComponent.details}</Text>
                ) : (
                  <Box>
                    <Heading size="xs" mb={1}>Root Element</Heading>
                    {selectedComponent.details?.rootElement ? (
                      <>
                        <Text fontSize="xs">Type: {selectedComponent.details.rootElement.type}</Text>
                        <Text fontSize="xs">ID: {selectedComponent.details.rootElement.id}</Text>
                      </>
                    ) : (
                      <Text fontSize="xs">No root element information available</Text>
                    )}
                    
                    <Button 
                      mt={4}
                      colorScheme="blue"
                      size="sm"
                      isLoading={enteringComponent}
                      disabled={enteringComponent}
                      onClick={() => handleEnterComponent(selectedComponent)}
                    >
                      Enter Component
                    </Button>
                  </Box>
                )}
              </Box>
            ) : (
              <Text>Select a component to view details</Text>
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default ComponentExplorer;