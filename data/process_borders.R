library(tidyverse)
library(sf)
library(rmapshaper)

# aggregates .shp files into a single geojson file
# renames columns to easy-to-type names
process_borders <- function() {
  dta <- c("data/raw/gadm36_KOR_2_sf.rds", "data/raw/gadm36_PRK_2_sf.rds") %>%
    map_dfr(\(file) {
      shp <- readRDS(file)
      st_crs(shp) <-
        st_crs(shp) # handle "old-style" projection warnings
      return(shp)
    }) %>%
    st_union() %>%
    ms_simplify(keep = 0.04)

  write_sf(dta, "data/raw/borders.json", driver = "GeoJSON", delete_dsn = TRUE)
}

process_borders()
