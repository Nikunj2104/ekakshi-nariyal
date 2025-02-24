"use client";
import { useState, useRef, useEffect } from "react";
import {
  TextField,
  IconButton,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

const PocFind = () => {
  const [isClient, setIsClient] = useState(false); // Initialize client-side check
  const [query, setQuery] = useState("");
  const [currentIndex, setCurrentIndex] = useState(-1); // Tracks the current match index
  const contentRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    setIsClient(true); // Set isClient to true after component has mounted
  }, []);

  if (!isClient) {
    return null; // Prevent rendering until the client-side is ready
  }

  // Function to find all matches of the query in the content
  const findAllMatches = (element, keyword) => {
    if (!keyword.trim()) return [];

    const textNodes = getTextNodes(element);
    const matches = [];

    textNodes.forEach((node) => {
      let startIndex = 0;
      let index;
      while (
        (index = node.nodeValue
          .toLowerCase()
          .indexOf(keyword.toLowerCase(), startIndex)) !== -1
      ) {
        matches.push({
          node,
          start: index,
          end: index + keyword.length,
        });
        startIndex = index + keyword.length;
      }
    });

    return matches;
  };

  // Function to highlight a specific match
  const highlightMatch = (matches, index) => {
    // Remove previous highlights
    const prevHighlights = contentRef.current.querySelectorAll("mark");
    prevHighlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      parent.replaceChild(
        document.createTextNode(highlight.textContent),
        highlight
      );
    });

    if (index >= 0 && index < matches.length) {
      const { node, start, end } = matches[index];

      // Split the text node into three parts: before, match, and after
      const before = document.createTextNode(node.nodeValue.slice(0, start));
      const matchText = document.createElement("mark");
      matchText.textContent = node.nodeValue.slice(start, end);
      const after = document.createTextNode(node.nodeValue.slice(end));

      // Replace the original text node with the new structure
      node.parentNode.insertBefore(before, node);
      node.parentNode.insertBefore(matchText, node);
      node.parentNode.insertBefore(after, node);
      node.parentNode.removeChild(node);

      // Scroll the highlighted match into view
      matchText.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Function to handle the "Next" button click
  const handleNextClick = () => {
    if (contentRef.current) {
      const matches = findAllMatches(contentRef.current, query);
      if (matches.length > 0) {
        const nextIndex = (currentIndex + 1) % matches.length; // Cycle through matches
        setCurrentIndex(nextIndex);
        highlightMatch(matches, nextIndex);
      }
    }
  };

  // Function to handle the "Previous" button click
  const handlePreviousClick = () => {
    if (contentRef.current) {
      const matches = findAllMatches(contentRef.current, query);
      if (matches.length > 0) {
        const prevIndex =
          currentIndex <= 0 ? matches.length - 1 : currentIndex - 1; // Cycle backward
        setCurrentIndex(prevIndex);
        highlightMatch(matches, prevIndex);
      }
    }
  };

  // Function to handle the "Close" button click
  const handleCloseClick = () => {
    setQuery("");
    setCurrentIndex(-1);
    const prevHighlights = contentRef.current.querySelectorAll("mark");
    prevHighlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      parent.replaceChild(
        document.createTextNode(highlight.textContent),
        highlight
      );
    });
  };

  // Function to extract text nodes from the DOM
  const getTextNodes = (element) => {
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const nodes = [];
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    return nodes;
  };

  // Find matches for the current query
  const matches = findAllMatches(contentRef.current, query);

  // Automatically highlight the first match when a query is entered
  if (query.trim() !== "" && currentIndex === -1 && matches.length > 0) {
    setCurrentIndex(0);
    highlightMatch(matches, 0);
  }

  return (
    <Box sx={{ paddingBottom: 2, maxWidth: "90%", margin: "0 auto" }}>
      {/* Sticky Search Bar */}
      <Box
        sx={{
          position: "sticky",
          top: "64px",
          zIndex: 100,
          background: theme.palette.background.paper,
          padding: "10px 0",
          borderBottom: `1px solid ${theme.palette.divider}`,
          paddingX: "10vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: "4px",
            padding: "8px",
            backgroundColor: theme.palette.background.default,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search here..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCurrentIndex(-1); // Reset current index when query changes
            }}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
          />
          {query.trim() !== "" && (
            <>
              <Typography variant="body2" color="text.secondary">
                {matches.length > 0
                  ? `${currentIndex + 1}/${matches.length}`
                  : "0/0"}
              </Typography>
              <IconButton
                onClick={handlePreviousClick}
                disabled={query.trim() === "" || matches.length === 0}
                sx={{ p: 0 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <IconButton
                onClick={handleNextClick}
                disabled={query.trim() === "" || matches.length === 0}
                sx={{ p: 0 }}
              >
                <ArrowForwardIcon />
              </IconButton>
              <IconButton onClick={handleCloseClick} sx={{ p: 0 }}>
                <CloseIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      {/* Content to be searched */}
      <Box ref={contentRef} sx={{ marginTop: 2 }}>
        <Typography>
          Blog test Content: Mahadasha is oft-regarded as the most pivotal time
          in one’s life, capable of massive repercussions. Each of the nine
          planets or the Navagraha plays an important role in your life and it’s
          important to understand the effects of this cosmological phenomenon.
          This article focuses on Ketu Mahadasha and the significance of it over
          your life. According to Vedic scriptures, Ketu is considered a
          spiritual planet, and its effects oppose materialistic tendencies.
          This Dasha, which lasts up to 7 years, can bring spirituality,
          knowledge, and the ability to achieve greatness. However, it’s also
          claimed that those undergoing Ketu Mahadasha may not be too keen on
          pursuing a marital life. Those who are already married during this
          Dasha tend to feel detached from their partners. This phase also
          brings a lot of unhappiness, especially in terms of health and career.
          The stress incurred during this time is also quite hectic to deal with
          but the energy acquired during this phase allows people to participate
          in philosophical matters and perform virtuous deeds. Religious
          tendencies are heightened during this time and individuals may
          experience a higher, more spiritual inner strength, people may even
          give up materialistic luxuries, finding peace and happiness in the
          little things in life along with gaining a natural inclination toward
          yoga, meditation, and spirituality.
        </Typography>
        <Typography>
          Mahadasha is oft-regarded as the most pivotal time in one’s life,
          capable of massive repercussions. Each of the nine planets or the
          Navagraha plays an important role in your life and it’s important to
          understand the effects of this cosmological phenomenon. This article
          focuses on Ketu Mahadasha and the significance of it over your life.
          According to Vedic scriptures, Ketu is considered a spiritual planet,
          and its effects oppose materialistic tendencies. This Dasha, which
          lasts up to 7 years, can bring spirituality, knowledge, and the
          ability to achieve greatness. However, it’s also claimed that those
          undergoing Ketu Mahadasha may not be too keen on pursuing a marital
          life. Those who are already married during this Dasha tend to feel
          detached from their partners. This phase also brings a lot of
          unhappiness, especially in terms of health and career. The stress
          incurred during this time is also quite hectic to deal with but the
          energy acquired during this phase allows people to participate in
          philosophical matters and perform virtuous deeds. Religious tendencies
          are heightened during this time and individuals may experience a
          higher, more spiritual inner strength, people may even give up
          materialistic luxuries, finding peace and happiness in the little
          things in life along with gaining a natural inclination toward yoga,
          meditation, and spirituality.
        </Typography>
        <Typography>
          Mahadasha is oft-regarded as the most pivotal time in one’s life,
          capable of massive repercussions. Each of the nine planets or the
          Navagraha plays an important role in your life and it’s important to
          understand the effects of this cosmological phenomenon. This article
          focuses on Ketu Mahadasha and the significance of it over your life.
          According to Vedic scriptures, Ketu is considered a spiritual planet,
          and its effects oppose materialistic tendencies. This Dasha, which
          lasts up to 7 years, can bring spirituality, knowledge, and the
          ability to achieve greatness. However, it’s also claimed that those
          undergoing Ketu Mahadasha may not be too keen on pursuing a marital
          life. Those who are already married during this Dasha tend to feel
          detached from their partners. This phase also brings a lot of
          unhappiness, especially in terms of health and career. The stress
          incurred during this time is also quite hectic to deal with but the
          energy acquired during this phase allows people to participate in
          philosophical matters and perform virtuous deeds. Religious tendencies
          are heightened during this time and individuals may experience a
          higher, more spiritual inner strength, people may even give up
          materialistic luxuries, finding peace and happiness in the little
          things in life along with gaining a natural inclination toward yoga,
          meditation, and spirituality.
        </Typography>
      </Box>
    </Box>
  );
};

export default PocFind;
