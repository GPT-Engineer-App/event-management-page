import React, { useState } from "react";
import { Container, VStack, Button, Input, Textarea, Text, IconButton, useToast, Box, List, ListItem, ListIcon } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: "", description: "" });
  const [editIndex, setEditIndex] = useState(-1);
  const toast = useToast();

  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.description) {
      toast({
        title: "Error",
        description: "Name and description are required",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setEvents([...events, newEvent]);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Added",
      description: "Your event has been added successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewEvent(events[index]);
  };

  const handleSaveEdit = () => {
    const updatedEvents = events.map((event, index) => {
      if (index === editIndex) {
        return newEvent;
      }
      return event;
    });
    setEvents(updatedEvents);
    setEditIndex(-1);
    setNewEvent({ name: "", description: "" });
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" p={5}>
      <VStack spacing={4} align="stretch">
        <Box>
          <Text fontSize="2xl" mb={4}>
            Manage Events
          </Text>
          <Input placeholder="Event Name" value={newEvent.name} onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })} />
          <Textarea placeholder="Event Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} mt={2} />
          {editIndex === -1 ? (
            <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddEvent} mt={2}>
              Add Event
            </Button>
          ) : (
            <Button leftIcon={<FaSave />} colorScheme="blue" onClick={handleSaveEdit} mt={2}>
              Save Changes
            </Button>
          )}
        </Box>
        <List spacing={3}>
          {events.map((event, index) => (
            <ListItem key={index} p={2} borderWidth="1px" borderRadius="lg">
              <Text fontWeight="bold">{event.name}</Text>
              <Text>{event.description}</Text>
              <IconButton aria-label="Edit" icon={<FaEdit />} onClick={() => handleEdit(index)} size="sm" colorScheme="yellow" mr={2} />
              <IconButton aria-label="Delete" icon={<FaTrash />} onClick={() => handleDelete(index)} size="sm" colorScheme="red" />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
